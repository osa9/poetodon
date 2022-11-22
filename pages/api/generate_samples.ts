import {NextApiHandler} from "next";
import head from "../../lib/head";
import {cardUrls} from "../../app/cardData";

const handler: NextApiHandler = async (req, res) => {
  const urls = cardUrls
  try {
    const statuses = await Promise.all(urls.map(async (url) => {
      const host = new URL(url).host
      const statusId = new URL(url).pathname.split("/").pop()
      const status = await fetch(`https://${host}/api/v1/statuses/${statusId}`)
      if (status.status === 404) {
        throw Error("Tootが見つかりませんでした:" + statusId)
      }
      if (status.status !== 200) {
        throw Error("Tootの取得に失敗しました" + statusId)
      }

      return await status.json()
    }))
    res.status(200).json(statuses)
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({error: e.message})
    } else {
      res.status(500).json({error: "不明なエラー"})
    }
  }
}

export default handler
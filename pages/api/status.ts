import {NextApiHandler} from "next";
import head from "../../lib/head";

const handler: NextApiHandler = async (req, res) => {
  const url = head(req.query.url)
  if (!url) {
    res.status(400).json({error: "URLが指定されていません"})
    return
  }

  const host = new URL(url).host
  const statusId = new URL(url).pathname.split("/").pop()
  const status = await fetch(`https://${host}/api/v1/statuses/${statusId}`)
  if(status.status === 404) {
    res.status(404).json({error: "Tootが見つかりませんでした"})
    return
  }
  if(status.status !== 200) {
    res.status(500).json({error: "Tootの取得に失敗しました"})
    return
  }

  const data = await status.json()
  res.status(200).json({ host, statusId, data })
}

export default handler
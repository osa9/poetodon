import React from 'react'

import 'client-only'
import { toBlob } from 'html-to-image'
import {GetServerSideProps, NextPage} from 'next'
import Head from 'next/head'

import ColorCard from '../app/ColorCard'
import Og from '../app/og'
import LoadingButton from '../components/LoadingButton'
import { OgParams } from '../lib/og/api'
import { OgTheme, themePresets } from '../lib/og/theme'
import {PollResult, toPoll} from "../entities/poll";
import {data} from "../app/cardData";

//const testData =
//  '{"id":"106072510934240987","created_at":"2021-04-16T01:54:29.709Z","in_reply_to_id":null,"in_reply_to_account_id":null,"sensitive":false,"spoiler_text":"","visibility":"public","language":"ja","uri":"https://handon.club/users/highemerly/statuses/106072510934240987","url":"https://handon.club/@highemerly/106072510934240987","replies_count":0,"reblogs_count":4,"favourites_count":14,"edited_at":null,"favourited":false,"reblogged":false,"muted":false,"bookmarked":false,"content":"\u003cp\u003e何度でも言いますが、「仲良くしてね」と言うのは「馴れ合え」という意味ではなく、「気に食わん奴がおっても意識的に仲を悪くするようなことをやるな無視しろ」と言う意味です。\u003c/p\u003e","reblog":null,"application":null,"account":{"id":"1","username":"highemerly","acct":"highemerly","display_name":"はん","locked":false,"bot":false,"discoverable":true,"group":false,"created_at":"2017-04-14T00:00:00.000Z","note":"\u003cp\u003e名前は「はん」です。表示名は、サーバ代の足しにするため、ネーミングライツを販売しています。\u003c/p\u003e\u003cp\u003e発言数多いです。空中リプライを多用します。内輪投稿が多いですが，どなたでも気軽に話しかけてください。\u003c/p\u003e\u003cp\u003e全ての投稿は個人の見解であり，所属する組織やはんドンクラブを代表する見解ではありません。\u003c/p\u003e\u003cp\u003e★Admin of handon.club.\u003c/p\u003e\u003cp\u003e★Inquiry for handon.club / 運営への問い合わせ\u003cbr /\u003eダイレクトメッセージ or highemerly :senbei: me.com  ( :senbei: → @ )\u003c/p\u003e\u003cp\u003e★Server info. / 運営情報\u003cbr /\u003e\u003ca href=\\"https://handon.club/tags/handon_info\\" class=\\"mention hashtag\\" rel=\\"tag\\"\u003e#\u003cspan\u003ehandon_info\u003c/span\u003e\u003c/a\u003e or \u003ca href=\\"https://handon.hatenablog.jp/\\" target=\\"_blank\\" rel=\\"nofollow noopener noreferrer\\"\u003e\u003cspan class=\\"invisible\\"\u003ehttps://\u003c/span\u003e\u003cspan class=\\"\\"\u003ehandon.hatenablog.jp/\u003c/span\u003e\u003cspan class=\\"invisible\\"\u003e\u003c/span\u003e\u003c/a\u003e\u003cbr /\u003eその他は固定トゥート参照\u003c/p\u003e\u003cp\u003e★Patron / カンパ\u003cbr /\u003e\u003ca href=\\"https://fantia.jp/handon\\" target=\\"_blank\\" rel=\\"nofollow noopener noreferrer\\"\u003e\u003cspan class=\\"invisible\\"\u003ehttps://\u003c/span\u003e\u003cspan class=\\"\\"\u003efantia.jp/handon\u003c/span\u003e\u003cspan class=\\"invisible\\"\u003e\u003c/span\u003e\u003c/a\u003e or \u003ca href=\\"https://www.amazon.jp/hz/wishlist/ls/2GFSVDC4FW72T\\" target=\\"_blank\\" rel=\\"nofollow noopener noreferrer\\"\u003e\u003cspan class=\\"invisible\\"\u003ehttps://www.\u003c/span\u003e\u003cspan class=\\"ellipsis\\"\u003eamazon.jp/hz/wishlist/ls/2GFSV\u003c/span\u003e\u003cspan class=\\"invisible\\"\u003eDC4FW72T\u003c/span\u003e\u003c/a\u003e\u003c/p\u003e\u003cp\u003e★Icon\u003cbr /\u003e\u003cspan class=\\"h-card\\"\u003e\u003ca href=\\"https://pawoo.net/@ech\\" class=\\"u-url mention\\"\u003e@\u003cspan\u003eech\u003c/span\u003e\u003c/a\u003e\u003c/span\u003e\u003c/p\u003e","url":"https://handon.club/@highemerly","avatar":"https://media.handon.club/accounts/avatars/000/000/001/original/5a9499233e906258.jpg","avatar_static":"https://media.handon.club/accounts/avatars/000/000/001/original/5a9499233e906258.jpg","header":"https://media.handon.club/accounts/headers/000/000/001/original/004186f7720a5136.png","header_static":"https://media.handon.club/accounts/headers/000/000/001/original/004186f7720a5136.png","followers_count":690,"following_count":359,"statuses_count":113525,"last_status_at":"2022-11-14","emojis":[{"shortcode":"senbei","url":"https://media.handon.club/custom_emojis/images/000/010/407/original/c676d5cf09c1077d.png","static_url":"https://media.handon.club/custom_emojis/images/000/010/407/static/c676d5cf09c1077d.png","visible_in_picker":true}],"fields":[{"name":"Webpage","value":"\u003ca href=\\"https://highemerly.net/\\" target=\\"_blank\\" rel=\\"nofollow noopener noreferrer me\\"\u003e\u003cspan class=\\"invisible\\"\u003ehttps://\u003c/span\u003e\u003cspan class=\\"\\"\u003ehighemerly.net/\u003c/span\u003e\u003cspan class=\\"invisible\\"\u003e\u003c/span\u003e\u003c/a\u003e","verified_at":"2020-01-13T06:03:46.562+00:00"},{"name":"Youtube","value":"\u003ca href=\\"https://youtube.com/channel/UCQAGPX23970WQ2wTpM7aZqw\\" target=\\"_blank\\" rel=\\"nofollow noopener noreferrer me\\"\u003e\u003cspan class=\\"invisible\\"\u003ehttps://\u003c/span\u003e\u003cspan class=\\"ellipsis\\"\u003eyoutube.com/channel/UCQAGPX239\u003c/span\u003e\u003cspan class=\\"invisible\\"\u003e70WQ2wTpM7aZqw\u003c/span\u003e\u003c/a\u003e","verified_at":null},{"name":"Strike Witches","value":"3期6話","verified_at":null},{"name":"Pronoun","value":"they/them","verified_at":null}],"profile_emojis":[]},"media_attachments":[],"mentions":[],"tags":[],"emojis":[],"card":null,"poll":null,"profile_emojis":[]}'

interface ServerSideParams {
  tootData: string
}

export const getServerSideProps: GetServerSideProps<ServerSideParams> = async () => {
  return {
    props: {
      tootData: JSON.stringify(data[Math.floor(Math.random() * data.length)])
    }
  }
}

const Index: NextPage<ServerSideParams> = ({tootData}) => {
  const toot = tootData && JSON.parse(tootData)

  const [url, setUrl] = React.useState('')
  const [error, setError] = React.useState<string>()
  const [loading, setLoading] = React.useState(false)
  const [downloading, setDownloading] = React.useState(false)
  const [copying, setCopying] = React.useState(false)

  const [avatar, setAvatar] = React.useState(toot?.account?.avatar_static)
  const [displayName, setDisplayName] = React.useState(
    toot?.account?.display_name
  )
  const [acct, setAcct] = React.useState(
    '@' + toot?.account?.acct + '@handon.club'
  )
  const [content, setContent] = React.useState(toot?.content)
  const [createdAt, setCreatedAt] = React.useState(toot?.created_at)
  const [poll, setPoll] = React.useState<PollResult | undefined>(toot?.poll)

  const [color, setColor] = React.useState(themePresets[0].color)
  const [cardColor, setCardColor] = React.useState(themePresets[0].cardColor)
  const [textColor, setTextColor] = React.useState(themePresets[0].textColor)
  const [font, setFont] = React.useState(themePresets[0].font)

  const bodyRef = React.useRef<HTMLDivElement>(null)
  const cardRef = React.useRef<HTMLDivElement>(null)

  const baseContainerRef = React.useRef<HTMLDivElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const [resize, setResize] = React.useState(true)
  const resizeEvent = () => setResize(!resize)

  React.useEffect(() => {
    const onResize = () => {
      if (baseContainerRef.current && containerRef.current && bodyRef.current) {
        const baseWidth = baseContainerRef.current.offsetWidth
        const containerWidth = containerRef.current.offsetWidth
        const scale = Math.min(baseWidth / containerWidth, 1.0)
        containerRef.current.style.transform = `scale(${scale})`
        containerRef.current.style.height = `${
          bodyRef.current.offsetHeight * scale
        }px`
      }
    }

    window.addEventListener('resize', onResize)
    onResize()

    return () => window.removeEventListener('resize', onResize)
  }, [containerRef, bodyRef, resize])

  const onGetUrl = async () => {
    if (loading) {
      return
    }

    if (!url) {
      setError('URLを入力してください')
      return
    }

    setLoading(true)

    try {

      const res = await fetch('/api/status?url=' + encodeURIComponent(url))
      const data = await res.json()

      if (data.error) {
        setError('Error: ' + data.error)
      } else {
        setError(undefined)
        setAvatar(data.data.account.avatar_static)
        setDisplayName(data.data.account.display_name)
        setAcct(
          '@' +
          data.data.account.acct +
          (data.data.account.acct.includes('@') ? '' : '@' + data.host)
        )
        setContent(data.data.content)
        setPoll(data.data.poll ?? toPoll(data.data.poll))
        setCreatedAt(data.data.created_at)
      }

      resizeEvent()
    } catch(err) {
      console.error(err)
    }

    setLoading(false)
  }

  const onDownload = async (toClipboard: boolean = false) => {
    if (loading || downloading || copying || !bodyRef.current) {
      return
    }

    if (toClipboard) {
      setCopying(true)
    } else {
      setDownloading(true)
    }

    /*const width = bodyRef?.current?.offsetWidth
    const height = bodyRef?.current?.offsetHeight
    const cardWidth = cardRef?.current?.offsetWidth
    const cardHeight = cardRef?.current?.offsetHeight

    if (!width || !height || !cardWidth || !cardHeight) {
      setError("Error: 画像の生成に失敗しました")
      setDownloading(false)
      return
    }

    const res = await fetch('/api/og', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar,
        displayName,
        acct,
        content,
        createdAt,
        color,
        cardColor,
        textColor,
        font,
        width,
        height,
        cardWidth,
        cardHeight
      }),
    })

    if (!res.ok) {
      setError("Error: 画像の生成に失敗しました(" + res.statusText + ")")
      setDownloading(false)
      return
    }

    const data = await res.blob() */

    try {
      let data;
      for (let i = 0; i < 2; i++) {
        data = await toBlob(bodyRef.current, {cacheBust: true}) // need to call twice to get correct image
      }

      if (!data) {
        setError('Error: 画像の生成に失敗しました')
        setDownloading(false)
        setCopying(false)
        return
      }

      if (toClipboard) {
        try {
          await navigator.clipboard.write([
            new ClipboardItem({
              'image/png': data,
            }),
          ])
        } catch (e) {
          setError('Error: クリップボードへのコピーに失敗しました')
        }
      } else {
        const url = window.URL.createObjectURL(data)
        const a = document.createElement('a')
        a.href = url
        a.download = 'card.png'
        a.click()
      }
    } finally {
      setDownloading(false)
      setCopying(false)
    }
  }

  const setTheme = (theme: OgTheme) => {
    setColor(theme.color)
    setCardColor(theme.cardColor)
    setTextColor(theme.textColor)
    setFont(theme.font)
  }

  const params: OgParams = {
    width: 820,
    height: 350,
    color,
    cardWidth: 600,
    cardHeight: 300,
    cardColor,
    textColor,
    font,

    avatar,
    displayName,
    acct,
    content,
    poll,
    createdAt,
  }

  return (
    <div className="p-4">
      <Head>
        <title>Poetodon</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&display=swap"
          rel="stylesheet"
        />
      </Head>
      <h1 style={{ color: '#efefef' }} className="text-4xl">
        Poetodon
      </h1>
      <div>
        <div ref={baseContainerRef} className="flex flex-col items-center">
          <div
            className="mt-8 flex space-x-2 items-center"
            style={{ width: '100%', maxWidth: 820 }}
          >
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tool URL e.g. https://handon.club/web/@highemerly/106072510934240987"
              value={url}
              onChange={(event) => {
                setUrl(event.target.value)
              }}
            />
            <button
              className="bg-gray-500 hover:bg-gray-400 text-white rounded px-4 py-2 mt-2"
              onClick={onGetUrl}
              disabled={loading}
            >
              {loading ? 'Loading..' : 'Get'}
            </button>
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <div ref={containerRef} className="mt-8 mb-4 origin-top">
            {toot && <Og og={params} bodyRef={bodyRef} cardRef={cardRef} />}
          </div>
          <div className="flex space-x-2">
            {themePresets.map((theme, i) => (
              <ColorCard
                key={i}
                color={theme.color}
                cardColor={theme.cardColor}
                onClick={() => setTheme(theme)}
              />
            ))}
          </div>
          <div className="mt-4" style={{ width: '100%', maxWidth: 480 }}>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="background color"
              value={color}
              onChange={(event) => setColor(event.target.value)}
            />
          </div>
          <div className="mt-4" style={{ width: '100%', maxWidth: 480 }}>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="background color"
              value={cardColor}
              onChange={(event) => setCardColor(event.target.value)}
            />
          </div>
          <div className="mt-4" style={{ width: '100%', maxWidth: 480 }}>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="background color"
              value={textColor}
              onChange={(event) => setTextColor(event.target.value)}
            />
          </div>
          <div className="mt-4">
            <LoadingButton
              onClick={() => onDownload(true)}
              loading={copying}
              disabled={loading || copying || downloading}
            >
              Copy
            </LoadingButton>
            <LoadingButton
              onClick={() => onDownload(false)}
              loading={downloading}
              disabled={loading || copying || downloading}
            >
              Download
            </LoadingButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index

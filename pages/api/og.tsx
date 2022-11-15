import {NextApiHandler} from "next";
import chromium from 'chrome-aws-lambda'
// @ts-ignore
import puppeteer from 'puppeteer-core'

import { getStylesCss, OgParams} from "../../lib/og/api";


const handler: NextApiHandler = async (req, res) => {
  const params = req.body as OgParams

  const styles = getStylesCss(params)

  const createdAt = new Date(params.createdAt)
  const jstCreatedAt = new Date(createdAt.getTime() + (createdAt.getTimezoneOffset() * 60 * 1000) + (9 * 60 * 60 * 1000))
  const formattedCreatedAt = `${jstCreatedAt.getFullYear()}年${(jstCreatedAt.getMonth() + 1).toString().padStart(2, '0')}月${(jstCreatedAt.getDate()).toString().padStart(2, '0')}日 ${jstCreatedAt.getHours().toString().padStart(2, '0')}:${jstCreatedAt.getMinutes().toString().padStart(2, '0')}`

  const html = `<html>
      <head>
        <style>

        body {
          ${styles.body};
          margin: 0;
          padding: 0;
        }
        
        * {
           box-sizing: border-box;
        }        
        
        .card {
          ${styles.card}
        }
        
        .avatar {
          ${styles.avatar}
        }
        
        .user {
          ${styles.user}
        }
        
        .displayName {
          ${styles.displayName}
        }
        
        .acct {
          ${styles.acct}
        }
        
        .content {
          ${styles.content}
          
        }
        
        a {
          text-decoration: none
        }
        
        .date {
          ${styles.date}
        }

        </style>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        <div class="card">
          <div class="user">
            <img src="${params.avatar}" class="avatar" />
            <div class="displayName">${params.displayName}</div>
            <div class="acct">${params.acct}</div>
          </div>
          <div class="content">${params.content}</div>
          <div class="date">${formattedCreatedAt}</div>
        </div>
      </body>
    </html>`

  await chromium.font(
    "https://raw.githack.com/minoryorg/Noto-Sans-CJK-JP/master/fonts/NotoSansCJKjp-Regular.ttf"
  );

  const browser = await puppeteer.launch({
    args: [...chromium.args, `--window-size=${params.width},${params.height}`],
    defaultViewport: { width: params.width, height: params.height},
    executablePath: process.env.NODE_ENV === 'development' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : await chromium.executablePath,
    headless: false
  })

  const page = await browser.newPage()
  await page.setViewport({width:params.width, height:params.height, deviceScaleFactor: 1});
  await page.setContent(html)

  const buffer = await page.screenshot({omitBackground: true, fullPage: true})

  res.setHeader('Content-Type', 'image/png')
  res.setHeader('Cache-Control', 'public, immutable, no-transform, s-maxage=31536000, max-age=31536000')
  res.end(buffer, 'binary')
}

export default handler
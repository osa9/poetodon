import {NextApiHandler} from "next";
import chromium from 'chrome-aws-lambda'
import puppeteer from 'puppeteer-core'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone';

import { getStylesCss, OgParams} from "../../lib/og/api";
import head from "../../lib/head";

dayjs.extend(timezone);

const handler: NextApiHandler = async (req, res) => {
  const params = req.body as OgParams

  /*const width = head(toot.width)
  const height = head(req.query.height)
  const cardWidth = head(req.query.cardWidth)
  const cardHeight = head(req.query.cardHeight)
  const color = head(req.query.color)
  const cardColor = head(req.query.cardColor)
  const textColor = head(req.query.textColor)
  const avatar = head(req.query.avatar)
  const displayName = head(req.query.displayName)
  const acct = head(req.query.acct)
  const content = head(req.query.content)
  const createdAt = head(req.query.createdAt)

  if (!width || ! height || !cardWidth || !cardHeight || !color || !cardColor || !textColor || !avatar || !displayName || !acct || !content || !createdAt) {
    res.status(400).send('Bad Request')
    return
  }

  const params: OgParams = {
    width: Number.parseInt(width),
    height: Number.parseInt(height),
    cardWidth: Number.parseInt(cardWidth),
    cardHeight: Number.parseInt(cardHeight),
    color,
    cardColor,
    textColor,
    avatar,
    displayName,
    acct,
    content,
    createdAt,
  } */

  console.log(params)

  const styles = getStylesCss(params)

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: { width: params.width, height: params.height},
    executablePath: process.env.NODE_ENV === 'development' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : await chromium.executablePath,
    headless: process.env.NODE_ENV === 'development' ? true : chromium.headless,
  })


  const html = `<html>
      <head>
        <style>

        body {
          ${styles.body}
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
      </head>
      <body>
        <div class="card">
        <div class="user">
          <img src="${params.avatar}" class="avatar" />
          <div class="displayName">${params.displayName}</div>
          <div class="user">${params.acct}</div>
        </div>
        <div class="content">${params.content}</div>
        <div class="date">${dayjs(params.createdAt).format('YYYY年MM月DD日 HH:mm')}</div>
      </body>
    </html>`

  const page = await browser.newPage()
  await page.setViewport({width:params.width, height:params.height, deviceScaleFactor: 2});
  await page.setContent(html)
  const buffer = await page.screenshot()

  res.setHeader('Content-Type', 'image/png')
  res.setHeader('Cache-Control', 'public, immutable, no-transform, s-maxage=31536000, max-age=31536000')
  res.end(buffer, 'binary')
}

export default handler
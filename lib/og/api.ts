import {
  acctStyle,
  avatarStyle,
  bodyStyle,
  cardStyle,
  contentStyle,
  dateStyle,
  dispayNameStyle,
  userStyle
} from "./style";
// @ts-ignore
import styleToCss from 'style-object-to-css-string';

export interface OgParams {
  width: number
  height: number
  color: string // base background color

  cardWidth: number
  cardHeight: number
  cardColor: string // card background color

  font?: string
  textColor: string

  avatar: string
  displayName: string
  acct: string
  content: string
  createdAt: string
}


export const getStyles = (params: OgParams) => {
  const {width, height, color, cardWidth, cardHeight, cardColor, textColor} = params
  return {
    body: bodyStyle({width, height, background: color}),
    card: cardStyle({width: cardWidth, height: cardHeight, background: cardColor, textColor: textColor}),
    avatar: avatarStyle({width: 64, height: 64}),
    user: userStyle(),
    displayName: dispayNameStyle(),
    acct: acctStyle(),
    content: contentStyle(),
    date: dateStyle()
  }
}

export const getStylesCss = (params: OgParams) => {
  const styles = getStyles(params)

  return {
    body: styleToCss(styles.body),
    card: styleToCss(styles.card),
    avatar: styleToCss(styles.avatar),
    user: styleToCss(styles.user),
    displayName: styleToCss(styles.displayName),
    acct: styleToCss(styles.acct),
    content: styleToCss(styles.content),
    date: styleToCss(styles.date)
  }
}
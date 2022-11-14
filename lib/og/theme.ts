export const ambientGradient =
  'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);'


export const goldGradient =
  'radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%), radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%)'

export interface OgTheme {
  color: string
  cardColor: string
  textColor: string
  font?: string
}

export const gold: OgTheme = {
  color: '#000000',
  cardColor:   'radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%), radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%)',
  textColor: '#222222',
}

export const light: OgTheme = {
  color: 'linear-gradient(45deg, #D9AFD9 0%, #97D9E1 100%)',
  cardColor: 'rgba(255, 255, 255, 0.6)',
  textColor: '#222222',
}

export const themePresets: OgTheme[] = [gold, light]
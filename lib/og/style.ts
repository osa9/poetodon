import {number} from "prop-types";
import {text} from "stream/consumers";

export interface BodyStyleParams {
  width: number
  height: number
  background: string
}

export interface CardStyleParams {
  width: number
  height: number
  background: string // linear-gradient(90deg, #e66465, #9198e5);
  textColor: string
}

export interface AvatarStyleParams {
  width: number
  height: number
}

export const bodyStyle = ({width, height, background}: BodyStyleParams) => {
  return {
    width: `${width}px`,
    minHeight: `${height}px`,
    background,
    display: 'flex',
    alignItems: 'center'
  }
}

export const cardStyle = ({width, height, background, textColor}: CardStyleParams) => {
  return {
    width: `${width}px`,
    background,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '30px auto',
    padding: '32px',
    color: textColor,
    fontSize: '20px',
    fontWeight: '500',
    lineHeight: '1.5',
    borderRadius: '20px',
    boxSizing: 'border-box',
    border: '1px solid hsla(0, 0%, 70%, 0.23)',
    boxShadow: 'rgb(0 0 0 / 5%) 4px 6px 20px 0px, rgb(0 0 0 / 7%) 3px 2px 6px 0px'
  }
}

export const avatarStyle = ({width, height}: AvatarStyleParams) => {
  return {
    width: `${width}px`,
    height: `${height}px`,
    borderRadius: '8px'
  }
}

export const userStyle = () => {
  return {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 600,
  }
}

export const dispayNameStyle = () => {
  return {
    marginLeft: '16px'
  }
}

export const acctStyle = () => {
  return {
    marginLeft: '16px'
  }
}

export const contentStyle = () => {
  return {
    marginTop: '16px',
    fontWeight: '400',
    fontSize: '24px',
  }
}

export const dateStyle = (textColor: string) => {
  return {
    marginTop: '16px',
    color: textColor,
    fontSize: '15px'
  }
}
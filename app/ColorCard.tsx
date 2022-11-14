import React from 'react'

export interface ColorCardProps {
  color: string
  cardColor: string
  onClick?: () => void
}

export const ColorCard: React.FC<ColorCardProps> = ({ onClick, color, cardColor }) => {
  return (
    <div
      className="rounded rounded flex items-center border-2 border-gray-700 hover:border-gray-500 cursor-pointer"
      style={{
        width: '64px',
        height: '48px',
        background: color,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={onClick}
    >
      <div className="rounded" style={{width: '48px', height: '32px',margin: 'auto', background: cardColor}}>
      </div>
    </div>
  )
}

export default ColorCard
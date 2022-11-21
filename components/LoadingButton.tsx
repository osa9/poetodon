import React from 'react'

export interface LoadingButtonProps {
  onClick?: () => Promise<void>
  loading?: boolean
  disabled?: boolean
  children?: React.ReactNode
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  onClick,
  loading,
  disabled,
  children,
}) => {

  return (
    <button
      className="bg-gray-500 hover:bg-gray-400 text-white rounded px-4 py-2 mt-2 mx-2"
      onClick={onClick}
      disabled={disabled || loading}
    >
      <div className="flex items-center">
        {children}
        {loading && (
          <div
            className="animate-spin ml-2 h-5 w-5 border-2 border-grey-500 rounded-full"
            style={{ borderTopColor: 'transparent' }}
          />
        )}
      </div>
    </button>
  )
}

export default LoadingButton

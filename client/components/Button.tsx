import React from 'react'

interface Props {
  variant?: string
  onClick?: (event: React.MouseEvent) => void
  children: React.ReactNode
  textColor?: string
  border?: string
}

export function Button({
  variant,
  onClick,
  children,
  textColor,
  border,
}: Props) {
  let color = ''
  switch (variant) {
    case 'red':
      color = 'bg-red'
      break
    case 'green':
      color = 'bg-green'
      break
    case 'white':
      color = 'bg-white'
      break
    case 'hover-red':
      color = 'hover:bg-red bg-secondary'
      break
    case 'hover-green':
      color = 'hover:bg-green bg-secondary'
      break
    default:
      color = 'bg-primary hover:bg-secondary'
  }

  let fontColor = ''
  switch (textColor) {
    case 'black':
      fontColor = 'text-black'
      break
    default:
      fontColor = 'text-white'
  }

  let borderColor = ''
  switch (border) {
    case 'border':
      borderColor = 'border-solid border-border border-2 border-black'
      break
    default:
      borderColor = ''
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={`inline-block rounded px-6 pb-1.5 pt-2 text-sm font-medium uppercase leading-normal ${fontColor} ${borderColor} shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out ${color} hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] md:mb-0 md:mr-2`}
    >
      {children}
    </button>
  )
}

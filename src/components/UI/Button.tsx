import React from 'react'
import { ButtonProps } from '../../types'
import style from '../../styles/components/UI/Button.module.css'

const Button: React.FC<ButtonProps> = (props) => {
  const { type, onClick, disabled, children } = props
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={style.button}
    >
      {children}
    </button>
  )
}

export default Button

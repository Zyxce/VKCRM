import React, { FC, useEffect } from 'react'
import { ModalProps } from '../../types'
import style from '../../styles/components/UI/Modal.module.css'

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return <div className={style.modalContainer}>{children}</div>
}

export default Modal

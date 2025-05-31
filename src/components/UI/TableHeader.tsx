import React from 'react'
import { FiFilePlus } from 'react-icons/fi'
import { FaVk } from 'react-icons/fa6'
import Button from './Button'
import style from '../../styles/components/UI/TableHeader.module.css'
import { TableHeaderProps } from '../../types'

const TableHeader: React.FC<TableHeaderProps> = ({ onAdd, header }) => {
  return (
    <div className={style.tableHeader}>
      <div className={style.tableHeaderLeft}>
        <FaVk className={style.icon} />
        <h1 className={style.title}>{header}</h1>
      </div>
      {onAdd ? (
        <Button onClick={onAdd}>
          Add New Record
          <FiFilePlus className={style.addIcon} />
        </Button>
      ) : (
        <></>
      )}
    </div>
  )
}

export default TableHeader

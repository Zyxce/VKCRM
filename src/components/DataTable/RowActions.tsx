import React from 'react'
import { MdEditDocument } from 'react-icons/md'
import { MdDelete } from 'react-icons/md'
import { RowActionsProps } from '../../types'
import Button from '../UI/Button'
import style from '../../styles/components/DataTable/RowActions.module.css'

const RowActions: React.FC<RowActionsProps> = React.memo(
  ({ onEdit, onDelete, isDeleting }) => (
    <div className={style.rowContainer}>
      <Button className={style.button} onClick={onEdit}>
        Edit
        <MdEditDocument className={style.icon} />
      </Button>
      <Button onClick={onDelete} disabled={isDeleting}>
        {isDeleting ? 'Deleting...' : 'Delete'}
        <MdDelete className={style.icon} />
      </Button>
    </div>
  )
)

export default RowActions

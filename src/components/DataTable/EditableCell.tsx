import React from 'react'
import { EditableCellProps } from '../../types'

const EditableCell: React.FC<EditableCellProps> = ({
  value,
  isEditing,
  onChange,
}) => {
  if (!isEditing) return <>{value?.toString() ?? '-'}</>

  return (
    <input
      value={value}
      onChange={(e) =>
        onChange(
          typeof value === 'number' ? Number(e.target.value) : e.target.value
        )
      }
    />
  )
}

export default EditableCell

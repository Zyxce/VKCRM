import React from 'react'
import EditableCell from './EditableCell'
import { TableRowProps } from '../../types'

const TableRow: React.FC<TableRowProps> = React.memo(
  ({ index, record, columns, isEditing, editData, onEditChange }) => (
    <tr>
      <td>{index + 1}</td>
      {columns.map((column) => (
        <td key={String(column)}>
          <EditableCell
            value={isEditing ? editData[column] ?? '' : record[column]}
            isEditing={isEditing}
            onChange={(value) => onEditChange(column, value)}
          />
        </td>
      ))}
    </tr>
  )
)

export default TableRow

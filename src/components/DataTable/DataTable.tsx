import React, { useEffect, useCallback } from 'react'
import { VscLoading } from 'react-icons/vsc'
import { useRecordsStore } from '../../store/useRecordsStore'
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll'
import RowActions from './RowActions'
import { fieldsConfig } from '../../config/fieldsConfig'
import style from '../../styles/components/DataTable/DataTable.module.css'
import { DataTableProps } from '../../types'

export const DataTable: React.FC<DataTableProps> = ({ onEditRecord }) => {
  const {
    records,
    fetchNextPage,
    hasMore,
    isLoading,
    removeRecord,
    deleteLoading,
    error, // Добавлено получение ошибки из стора
  } = useRecordsStore()

  const handleLoadMore = useCallback(() => {
    if (hasMore && !isLoading) fetchNextPage()
  }, [hasMore, isLoading, fetchNextPage])

  const sentinelRef = useInfiniteScroll<HTMLTableRowElement>(
    handleLoadMore,
    hasMore,
    isLoading
  )

  useEffect(() => {
    if (!records.length) fetchNextPage()
  }, [fetchNextPage, records.length])

  const columns = fieldsConfig.map((field) => ({
    name: field.name,
    type: field.type,
    label: field.label,
    englishOnly: field.englishOnly,
  }))

  return (
    <div
      className={style.dataContainer}
      style={{ maxHeight: '80vh', overflow: 'auto' }}
    >
      <table className={style.dataTable}>
        <thead className={style.dataTableHeader}>
          <tr className={style.dataTableHeaderTR}>
            <th>#</th>
            {columns.map((col) => (
              <th key={col.name}>{col.label}</th>
            ))}
            <th className={style.dataTableHeaderActions}>Actions</th>
          </tr>
        </thead>
        <tbody className={style.dataTableBody}>
          {records.map((record, idx) => {
            const isDeleting = deleteLoading === record.id
            return (
              <tr key={record.id}>
                <td>{idx + 1}</td>
                {columns.map((col) => (
                  <td key={`${record.id}-${col.name}`}>
                    {record[col.name]?.toString() || '-'}
                  </td>
                ))}
                <td>
                  <RowActions
                    onEdit={() => onEditRecord(record)}
                    onDelete={() => removeRecord(record.id)}
                    isDeleting={isDeleting}
                  />
                </td>
              </tr>
            )
          })}

          {error && (
            <tr>
              <td colSpan={columns.length + 2} className={style.errorRow}>
                <div className={style.error} data-testid="table-error">
                  Failed to load employee records
                </div>
              </td>
            </tr>
          )}

          {hasMore && (
            <tr ref={sentinelRef} className={style.loadingData}>
              <td colSpan={columns.length + 2}>
                {isLoading ? 'Loading more data' : ''}
                <VscLoading className={style.dataIconLoading} />
              </td>
            </tr>
          )}
          {!hasMore && records.length > 0 && (
            <tr className={style.noMoreRecords}>
              <td colSpan={columns.length + 2}>No more records to load</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

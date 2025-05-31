import React from 'react'
import { useRecordsStore } from '../../store/useRecordsStore'
import style from '../../styles/components/UI/TableBottom.module.css'
import { BsDatabaseCheck } from 'react-icons/bs'
import { VscLoading } from 'react-icons/vsc'
import { BsDatabaseDash } from 'react-icons/bs'

const TableBottom: React.FC = () => {
  const { isLoading, records } = useRecordsStore()
  return (
    <div className={style.tableBottom}>
      {isLoading ? (
        <p className={style.dataLoading}>
          Loading Records <VscLoading className={style.dataIconLoading} />
        </p>
      ) : (
        <>
          {records.length > 0 ? (
            <>
              <p className={style.dataLoaded}>
                Loaded {records.length} Employee Records{' '}
                <BsDatabaseCheck className={style.dataIcon} />
              </p>
            </>
          ) : (
            <>
              <p className={style.dataNotLoaded}>
                Failed to Load Employee Records{' '}
                <BsDatabaseDash className={style.dataIcon} />
              </p>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default TableBottom

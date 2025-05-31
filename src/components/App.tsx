import '../styles/components/App.css'
import { useState } from 'react'
import { DataTable } from './DataTable/DataTable'
import Modal from './UI/Modal'
import { RecordForm } from './RecordForm'
import { RecordType } from '../types'
import TableHeader from './UI/TableHeader'
import { EditRecordForm } from './EditRecordForm'
import TableBottom from './UI/TableBottom'

const App: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState<RecordType | null>(null)

  const openEditModal = (record: RecordType) => {
    setEditingRecord(record)
  }

  const closeEditModal = () => {
    setEditingRecord(null)
  }

  // в таблице 3 состояния - сама таблица, форма для редактирования и форма для создания
  //форма для редактировния
  if (editingRecord) {
    return (
      <div className="App">
        <div className="table-container">
          <TableHeader header={'Edit Employee Record'} />
          <div className="table-border">
            <Modal isOpen={!!editingRecord} onClose={closeEditModal}>
              {editingRecord && (
                <EditRecordForm
                  record={editingRecord}
                  onSuccess={closeEditModal}
                  onCancel={closeEditModal}
                />
              )}
            </Modal>
          </div>
          <TableBottom />
        </div>
      </div>
    )
  }
  //форма для созднания
  if (isAddModalOpen) {
    return (
      <div className="App">
        <div className="table-container">
          <TableHeader header={'Add New Employee Record'} />
          <div className="table-border">
            <Modal
              isOpen={isAddModalOpen}
              onClose={() => setIsAddModalOpen(false)}
            >
              <RecordForm
                onSuccess={() => setIsAddModalOpen(false)}
                onCancel={() => setIsAddModalOpen(false)}
              />
            </Modal>
          </div>
          <TableBottom />
        </div>
      </div>
    )
  }
  //таблица
  return (
    <div className="App">
      <div className="table-container">
        <TableHeader
          header={'Employee Record Data'}
          onAdd={() => setIsAddModalOpen(true)}
        />
        <div className="table-border">
          <DataTable onEditRecord={openEditModal} />
        </div>
        <TableBottom />
      </div>
    </div>
  )
}

export default App

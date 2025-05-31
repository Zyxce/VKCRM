// src/types.ts
import React, { ReactNode, ButtonHTMLAttributes } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { z } from 'zod'

export interface RecordType {
  id: string
  [key: string]: string | number // поля динамические будут
}
// для создания записи без id
export type NewRecord = Omit<RecordType, 'id'>

// Универсальный тип события
export type FormElementChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>

//пропсы для EditRecordForm
export interface EditRecordFormProps {
  record: RecordType
  onSuccess?: () => void
  onCancel?: () => void
}

//пропсы для FormProps
export interface RecordFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

//пропсы для реюзабле модалки
export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

//пропсы для полей формы
export interface FormInputProps {
  label: string
  name: string
  type?: string
  options?: string[]
  register: UseFormRegister<any>
  errorMessage?: string
  disabled?: boolean
  required?: boolean
  englishOnly?: boolean
  onChange?: (e: FormElementChangeEvent) => void
}

//пропсы для строк таблицы
export interface TableRowProps {
  index: number
  record: RecordType
  columns: (keyof RecordType)[]
  isEditing: boolean
  editData: Partial<RecordType>
  onEditChange: (field: keyof RecordType, value: string | number) => void
}

//пропсы для верхней части таблицы
export interface TableHeaderProps {
  header: string
  onAdd?: () => void
}

//пропсы для кнопок внутри строк таблицы
export interface RowActionsProps {
  onEdit: () => void
  onDelete: () => void
  isDeleting: boolean
}

//пропсы для изменяемых ячеек
export interface EditableCellProps {
  value: string | number
  isEditing: boolean
  onChange: (value: string | number) => void
}

//пропсы для компонента datatable
export interface DataTableProps {
  onEditRecord: (record: RecordType) => void
}

//интерфейсы для RecordStore
export interface RecordsState {
  records: RecordType[]
  page: number
  limit: number
  hasMore: boolean
  isLoading: boolean
  createLoading: boolean
  editLoading: string | null
  deleteLoading: string | null
  error: string | null
}

export interface RecordsActions {
  fetchNextPage(): Promise<void>
  addRecord(data: NewRecord): Promise<void>
  editRecord(id: string, data: Partial<RecordType>): Promise<void>
  removeRecord(id: string): Promise<void>
}

//тип для бесконечного скроллинга
export type Callback = () => void

//интерфейс для field configa
export interface FieldConfig {
  name: string
  label: string
  type: 'text' | 'number' | 'email' | 'select' | 'date'
  required?: boolean
  options?: string[]
  englishOnly?: boolean // Флаг для проверки только английских символов
  validation: z.ZodTypeAny
}

//интерфейс для реюзабле кнопки
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

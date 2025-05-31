import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MdClose } from 'react-icons/md'
import { MdCheck } from 'react-icons/md'
import { VscError } from 'react-icons/vsc'
import { useRecordsStore } from '../store/useRecordsStore'
import {
  fieldsConfig,
  createRecordSchema,
  RecordFormData,
} from '../config/fieldsConfig'
import { FormInput } from './UI/FormInput'
import style from '../styles/components/RecordForm.module.css'
import { FormElementChangeEvent } from '../types'
import { RecordFormProps } from '../types'
import Button from './UI/Button'

export const RecordForm: React.FC<RecordFormProps> = ({
  onSuccess = () => {},
  onCancel = () => {},
}) => {
  const addRecord = useRecordsStore((state) => state.addRecord)
  const createLoading = useRecordsStore((state) => state.createLoading)
  const error = useRecordsStore((state) => state.error)

  const recordSchema = createRecordSchema(fieldsConfig)

  //здесь создается форма с типами из интерфейса, схема из Zod
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    trigger,
  } = useForm<RecordFormData>({
    resolver: zodResolver(recordSchema),
    defaultValues: fieldsConfig.reduce((acc, field) => {
      acc[field.name] = field.type === 'number' ? 0 : ''
      return acc
    }, {} as RecordFormData),
  })

  // ошибки внутри хранилища зустанда здесь их не обрабатывает
  const onSubmit = async (data: RecordFormData) => {
    try {
      await addRecord(data)
      reset()
      onSuccess()
    } catch (error) {}
  }

  //переделать потом
  const handleCancel = () => {
    onCancel()
  }

  // здесь проверка на валидацию
  const handleInputChange = useCallback(
    (
      e: FormElementChangeEvent,
      name: string,
      fieldType: string,
      englishOnly: boolean
    ) => {
      const value = e.target.value

      if (fieldType === 'number') {
        if (value === '' || !isNaN(Number(value))) {
          setValue(name as keyof RecordFormData, value)
          trigger(name as keyof RecordFormData)
        }
        return
      }

      if (englishOnly) {
        const englishRegex =
          /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? \s]*$/

        const isValid = value.split('').every((char) => englishRegex.test(char))

        if (isValid) {
          setValue(name as keyof RecordFormData, value)
        } else {
          const prevValue = (e.target as any)._valueTracker?.getValue?.() || ''
          setValue(name as keyof RecordFormData, prevValue)
        }

        trigger(name as keyof RecordFormData)
        return
      }

      setValue(name as keyof RecordFormData, value)
      trigger(name as keyof RecordFormData)
    },
    [setValue, trigger]
  )

  return (
    <div className={style.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        <div className={style.fieldsWrapper}>
          {fieldsConfig.map((field) => {
            const fieldError = errors[field.name]
            const errorMessage = fieldError?.message as string | undefined

            return (
              <div key={field.name} className={style.formField}>
                <FormInput
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  options={field.options}
                  register={register}
                  errorMessage={errorMessage}
                  disabled={isSubmitting || createLoading}
                  required={field.required}
                  englishOnly={field.englishOnly}
                  onChange={(e) =>
                    handleInputChange(
                      e,
                      field.name,
                      field.type,
                      !!field.englishOnly
                    )
                  }
                />
              </div>
            )
          })}
        </div>

        {error && (
          <div className={style.error} data-testid="global-error">
            <p>
              {error} <VscError className={style.errorIcon} />
            </p>
          </div>
        )}

        <div className={style.formSubmit}>
          <Button type="submit" disabled={isSubmitting || createLoading}>
            {isSubmitting || createLoading ? 'Saving...' : 'Save Record'}
            <MdCheck className={style.icon} />
          </Button>
          <Button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting || createLoading}
          >
            Cancel
            <MdClose className={style.icon} />
          </Button>
        </div>
      </form>
    </div>
  )
}

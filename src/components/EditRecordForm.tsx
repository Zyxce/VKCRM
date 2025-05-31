import React, { useCallback, useEffect } from 'react'
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
import { EditRecordFormProps } from '../types'
import { FormElementChangeEvent } from '../types'
import Button from './UI/Button'

export const EditRecordForm: React.FC<EditRecordFormProps> = ({
  record, //объект с полями записи для редактирования
  onSuccess = () => {},
  onCancel = () => {},
}) => {
  const editRecord = useRecordsStore((state) => state.editRecord)
  const editLoading = useRecordsStore((state) => state.editLoading)
  const error = useRecordsStore((state) => state.error)
  const recordSchema = createRecordSchema(fieldsConfig)

  //здесь создается форма с типами из интерфейса, схема из Zod
  //значения проходят через мемо
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    trigger,
  } = useForm<RecordFormData>({
    resolver: zodResolver(recordSchema),
    defaultValues: React.useMemo(() => {
      return fieldsConfig.reduce((acc, field) => {
        acc[field.name as keyof RecordFormData] =
          record[field.name] ?? (field.type === 'number' ? 0 : '')
        return acc
      }, {} as RecordFormData)
    }, [record]),
  })

  useEffect(() => {
    //форма сбрасывается при смене
    reset(
      fieldsConfig.reduce((acc, field) => {
        acc[field.name as keyof RecordFormData] =
          record[field.name] ?? (field.type === 'number' ? 0 : '')
        return acc
      }, {} as RecordFormData)
    )
  }, [record, reset])

  //обработчик сабмита
  const onSubmit = async (data: RecordFormData) => {
    try {
      await editRecord(record.id.toString(), data)
      onSuccess()
    } catch (e) {}
  }

  //переделать
  const handleCancel = () => {
    onCancel()
  }

  //перенести в utils
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
          const prev = (e.target as any)._valueTracker?.getValue?.() || ''
          setValue(name as keyof RecordFormData, prev)
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
                  disabled={isSubmitting || !!editLoading}
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
          <Button type="submit" disabled={isSubmitting || !!editLoading}>
            {isSubmitting || editLoading ? 'Saving...' : 'Save Changes'}
            <MdCheck className={style.icon} />
          </Button>
          <Button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting || !!editLoading}
          >
            Cancel
            <MdClose className={style.icon} />
          </Button>
        </div>
      </form>
    </div>
  )
}

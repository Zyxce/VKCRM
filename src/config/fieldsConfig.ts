import { z } from 'zod'
import { FieldConfig } from '../types'

//здесь проверка на англ
const englishRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? \s]*$/
const englishErrorMessage = 'Only English characters are allowed'

//потом перенести в отдельный json подключить к бэку и получиться полный адаптив
export const fieldsConfig: FieldConfig[] = [
  {
    name: 'name',
    label: 'Full Name',
    type: 'text',
    required: true,
    englishOnly: true,
    validation: z
      .string()
      .min(1, 'Fullname too short')
      .regex(englishRegex, englishErrorMessage),
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    required: true,
    validation: z.string().email('Invalid email format'),
  },
  {
    name: 'age',
    label: 'Age',
    type: 'number',
    required: true,
    validation: z.coerce
      .number()
      .min(18, 'Must be at least 18 years old')
      .max(65, 'Invalid age value'),
  },
  {
    name: 'city',
    label: 'City',
    type: 'text',
    required: true,
    englishOnly: true,
    validation: z
      .string()
      .min(2, 'City name too short')
      .regex(englishRegex, englishErrorMessage),
  },
  {
    name: 'position',
    label: 'Position',
    type: 'text',
    required: true,
    englishOnly: true,
    validation: z
      .string()
      .min(2, 'Position too short')
      .regex(englishRegex, englishErrorMessage),
  },
  {
    name: 'department',
    label: 'Department',
    type: 'select',
    required: false,
    options: ['Engineering', 'Marketing', 'HR', 'Sales', 'Finance'],
    validation: z.string().optional(),
  },
]

//генерация схемы для Zoda
export const createRecordSchema = (fields: FieldConfig[]) => {
  const schemaObj = fields.reduce((acc, field) => {
    acc[field.name] = field.validation
    return acc
  }, {} as Record<string, z.ZodTypeAny>)

  return z.object(schemaObj)
}

export type RecordFormData = z.infer<ReturnType<typeof createRecordSchema>>

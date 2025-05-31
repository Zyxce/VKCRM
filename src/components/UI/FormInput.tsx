import React from 'react'
import style from '../../styles/components/UI/FormInput.module.css'
import { FormInputProps } from '../../types'

export const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = 'text',
  options,
  register,
  errorMessage,
  disabled,
  required,
  englishOnly,
  onChange,
}) => {
  return (
    <div className={style.inputContainer}>
      <label htmlFor={name} className={style.inputLabel}>
        {label}
        {required && <span className={style.requiredAsterisk}>*</span>}
      </label>

      {type === 'select' ? (
        <select
          id={name}
          {...register(name, {
            onChange: onChange,
          })}
          disabled={disabled}
          className={`${style.inputSelect} ${errorMessage ? 'error' : ''}`}
          aria-invalid={!!errorMessage}
        >
          <option className={style.inputOption} value="">
            Select...
          </option>
          {options?.map((option) => (
            <option className={style.inputOption} key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          type={type}
          {...register(name, {
            onChange: onChange,
          })}
          disabled={disabled}
          className={`${style.inputField} ${errorMessage ? 'error' : ''}`}
          aria-invalid={!!errorMessage}
          placeholder={englishOnly ? 'English characters only' : ''}
        />
      )}

      {errorMessage && <div className={style.error}>{errorMessage}</div>}
    </div>
  )
}

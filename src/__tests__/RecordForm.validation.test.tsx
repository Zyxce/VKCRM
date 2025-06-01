import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecordForm } from '../components/RecordForm'

describe('RecordForm — валидация', () => {
  it('показывает ошибки валидации при пустых или некорректных полях', async () => {
    render(<RecordForm />)

    userEvent.click(screen.getByRole('button', { name: /Save Record/i }))

    // проверка на валидацию
    //имя: минимум 1 символ
    expect(await screen.findByText(/fullname too short/i)).toBeInTheDocument()
    //почта: формат
    expect(await screen.findByText(/invalid email format/i)).toBeInTheDocument()
    // возраст: минимум 18
    expect(
      await screen.findByText(/at least 18 years old/i)
    ).toBeInTheDocument()
    // город: минимум 3 символа
    expect(await screen.findByText(/city name too short/i)).toBeInTheDocument()
    // позицию: минимум 3 символа
    expect(await screen.findByText(/position too short/i)).toBeInTheDocument()
  })
})

import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { RecordForm } from '../components/RecordForm'
import { useRecordsStore } from '../store/useRecordsStore'

const mock = new MockAdapter(axios)

beforeEach(() => {
  useRecordsStore.setState({ records: [], createLoading: false, error: null })
  mock.reset()
})

describe('RecordForm — ошибка API', () => {
  it('показывает сообщение об ошибке и сбрасывает loading', async () => {
    mock.onPost('/records').networkError()

    render(<RecordForm />)

    // Заполняем форму валидными данными
    await userEvent.type(screen.getByLabelText(/full name/i), 'JohnDoe')
    await userEvent.type(
      screen.getByLabelText(/email address/i),
      'john@example.com'
    )
    await userEvent.type(screen.getByLabelText(/age/i), '30')
    await userEvent.type(screen.getByLabelText(/city/i), 'London')
    await userEvent.type(screen.getByLabelText(/position/i), 'Manager')

    await userEvent.click(screen.getByRole('button', { name: /Save Record/i }))

    // Проверяем глобальную ошибку
    await waitFor(() => {
      expect(screen.getByTestId('global-error')).toHaveTextContent(
        /network error/i
      )
    })

    // Проверяем стор
    const { createLoading, error } = useRecordsStore.getState()
    expect(createLoading).toBe(false)
    expect(error).toMatch(/network error/i)
  })
})

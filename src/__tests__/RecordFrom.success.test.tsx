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

describe('RecordForm — работает', () => {
  it('вызывает API и добавляет запись в стор', async () => {
    const mockRecord = {
      id: 1,
      name: 'JohnDoe',
      email: 'john@example.com',
      age: 30,
      city: 'London',
      position: 'Manager',
      department: 'Engineering',
    }

    mock.onPost('/records').reply(201, mockRecord)

    render(<RecordForm />)
    await userEvent.clear(screen.getByLabelText(/full name/i))
    await userEvent.type(screen.getByLabelText(/full name/i), mockRecord.name)

    await userEvent.clear(screen.getByLabelText(/email address/i))
    await userEvent.type(
      screen.getByLabelText(/email address/i),
      mockRecord.email
    )

    await userEvent.clear(screen.getByLabelText(/age/i))
    await userEvent.type(screen.getByLabelText(/age/i), String(mockRecord.age))

    await userEvent.clear(screen.getByLabelText(/city/i))
    await userEvent.type(screen.getByLabelText(/city/i), mockRecord.city)

    await userEvent.clear(screen.getByLabelText(/position/i))
    await userEvent.type(
      screen.getByLabelText(/position/i),
      mockRecord.position
    )

    await userEvent.selectOptions(
      screen.getByLabelText(/department/i),
      mockRecord.department
    )

    await userEvent.click(screen.getByRole('button', { name: /Save Record/i }))

    // проверка загрузки
    await waitFor(() => {
      expect(useRecordsStore.getState().createLoading).toBe(false)
    })

    // проверка обновы
    await waitFor(() => {
      const { records } = useRecordsStore.getState()
      expect(records).toEqual([mockRecord])
    })
  })
})

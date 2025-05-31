// src/__tests__/InfiniteScroll.test.tsx
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { useRecordsStore } from '../store/useRecordsStore'
import { DataTable } from '../components/DataTable/DataTable'
import { act } from 'react' // Исправленный импорт act

class MockIntersectionObserver {
  callback: any
  constructor(callback: any) {
    this.callback = callback
  }
  observe = jest.fn()
  disconnect = jest.fn()
  unobserve = jest.fn()
  trigger(isIntersecting: boolean) {
    this.callback([{ isIntersecting }])
  }
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver,
})

describe('Бесконечная загрузка', () => {
  const mock = new MockAdapter(axios)
  let observer: MockIntersectionObserver

  beforeEach(() => {
    //сбрасываем состояние стора
    useRecordsStore.setState({
      records: [],
      page: 1,
      limit: 20,
      hasMore: true,
      isLoading: false,
      error: null,
    })

    mock.reset()

    //мокаем IntersectionObserver
    window.IntersectionObserver = jest.fn().mockImplementation((callback) => {
      observer = new MockIntersectionObserver(callback)
      return observer
    })
  })

  it('грузится следующая страниц апри достижении низа', async () => {
    //генирируемтестовые данные
    const generateRecords = (start: number, count: number) =>
      Array.from({ length: count }, (_, i) => ({
        id: `${start + i}`,
        name: `User ${start + i}`,
        email: `user${start + i}@test.com`,
        age: 25 + i,
        city: 'City',
        position: 'Position',
        department: 'Engineering',
      }))

    const firstPage = generateRecords(1, 20)
    const secondPage = generateRecords(21, 20)

    //моки API
    mock.onGet('/records').replyOnce(200, firstPage)
    mock.onGet('/records').replyOnce(200, secondPage)

    render(<DataTable onEditRecord={() => {}} />)

    // 20 записей + заголовок + индикатор загрузки = 22 строки
    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(22)
    })

    //срабатывание IntersectionObserver
    act(() => {
      observer.trigger(true)
    })

    // 40 записей + заголовок + индикатор = 42 строки
    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(42)
    })
  })

  it('не грузит когда закончилась дата', async () => {
    const records = Array.from({ length: 15 }, (_, i) => ({
      id: `${i + 1}`,
      name: `User ${i + 1}`,
      email: `user${i + 1}@test.com`,
      age: 25 + i,
      city: 'City',
      position: 'Position',
      department: 'Engineering',
    }))

    mock.onGet('/records').reply(200, records)

    render(<DataTable onEditRecord={() => {}} />)

    // 15 записей + заголовок + сообщение о конце = 17 строк
    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(17)
    })

    //сообщение о конце данных
    expect(screen.getByText('No more records to load')).toBeInTheDocument()
  })

  it('ошибки при загрузке', async () => {
    mock.onGet('/records').networkErrorOnce()

    render(<DataTable onEditRecord={() => {}} />)

    // индикатор ошибки
    await waitFor(
      () => {
        const errorElement = screen.getByTestId('table-error')
        expect(errorElement).toHaveTextContent(/failed to load/i)
      },
      { timeout: 3000 }
    )
  })
})

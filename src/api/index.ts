import axios, { AxiosResponse } from 'axios'
import { RecordType, NewRecord } from '../types'

//настройка аксиоса
axios.defaults.baseURL = 'http://localhost:3001'
axios.defaults.headers['Content-Type'] = 'application/json'

//пагинация _start/_limit
export const fetchRecords = (
  page: number,
  limit: number
): Promise<AxiosResponse<RecordType[]>> =>
  axios.get('/records', {
    params: { _start: (page - 1) * limit, _limit: limit },
  })

//пост без id сервер сам cгенерирует случайный строковый id
export const createRecord = (
  record: NewRecord
): Promise<AxiosResponse<RecordType>> => axios.post('/records', record)

// патч по стринге id
export const updateRecord = (
  id: string,
  data: Partial<RecordType>
): Promise<AxiosResponse<RecordType>> => axios.patch(`/records/${id}`, data)

// удаление по стринге id
export const deleteRecord = (id: string): Promise<AxiosResponse<void>> =>
  axios.delete(`/records/${id}`)

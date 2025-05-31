import { create } from 'zustand'
import { fetchRecords, createRecord, updateRecord, deleteRecord } from '../api'
import { RecordType } from '../types'
import { AxiosResponse } from 'axios'
import { RecordsState, RecordsActions } from '../types'

export const useRecordsStore = create<RecordsState & RecordsActions>(
  (set, get) => ({
    records: [],
    page: 1,
    limit: 20,
    hasMore: true,
    isLoading: false,
    createLoading: false,
    editLoading: null,
    deleteLoading: null,
    error: null,

    // загрузка страницы
    fetchNextPage: async () => {
      const { page, limit, hasMore, isLoading, records } = get()
      if (!hasMore || isLoading) return
      set({ isLoading: true, error: null })
      try {
        const res: AxiosResponse<RecordType[]> = await fetchRecords(page, limit)
        set({
          records: [...records, ...res.data],
          page: page + 1,
          hasMore: res.data.length === limit,
        })
      } catch (e: any) {
        set({ error: e.message })
      } finally {
        set({ isLoading: false })
      }
    },

    // добавление нового id
    addRecord: async (data) => {
      set({ createLoading: true, error: null })
      try {
        const res = await createRecord(data)
        set((state) => ({ records: [...state.records, res.data] }))
      } catch (e: any) {
        set({ error: e.message })
      } finally {
        set({ createLoading: false })
      }
    },

    //редактирование по строковому id
    editRecord: async (id, data) => {
      set({ editLoading: id, error: null })
      try {
        const res = await updateRecord(id, data)
        set((state) => ({
          records: state.records.map((r) => (r.id === id ? res.data : r)),
        }))
      } catch (e: any) {
        set({ error: e.message })
      } finally {
        set({ editLoading: null })
      }
    },

    //удаление по строковому id
    removeRecord: async (id) => {
      set({ deleteLoading: id, error: null })
      try {
        await deleteRecord(id)
        set((state) => ({
          records: state.records.filter((r) => r.id !== id),
        }))
      } catch (e: any) {
        set({ error: e.message })
      } finally {
        set({ deleteLoading: null })
      }
    },
  })
)

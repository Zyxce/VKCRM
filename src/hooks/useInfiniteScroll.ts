import { useEffect, useRef } from 'react'
import { Callback } from '../types'

export function useInfiniteScroll<T extends Element>(
  callback: Callback,
  canLoad: boolean,
  isLoading: boolean
) {
  const observerRef = useRef<IntersectionObserver | null>(null) // хранит текущий IntersectionObserver
  const sentinelRef = useRef<T | null>(null) //ссылка на элемен, за которым следим

  useEffect(() => {
    //если загрузка или конец данных отключается observer
    if (!canLoad || isLoading) {
      observerRef.current?.disconnect()
      return
    }

    //отключаем прошлый, создаём новый
    observerRef.current?.disconnect()
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback()
      }
    })

    const el = sentinelRef.current
    if (el) observerRef.current.observe(el)

    return () => {
      observerRef.current?.disconnect()
    }
  }, [callback, canLoad, isLoading])

  return sentinelRef
}

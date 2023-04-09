import { useState, useEffect } from 'react'

/**
 * Гарантирует что кэширование значение value будет обновляться раз в delay миллисекунд.
 * @param value
 * @param {number} delay ms
 * @return debValue
 */
export function useDebounce(value: any, delay: number) {
  const [debValue, setValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => setValue(value), delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debValue
}
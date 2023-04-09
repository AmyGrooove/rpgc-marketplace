import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { useSearchParams } from 'react-router-dom'

export const calendarParam = 'filter.createdAt'

type CalendarProps = {
  date: [Date | null, Date | null]
  setDate: Dispatch<SetStateAction<[Date | null, Date | null]>>
  setDateFilter: (value: [Date | null, Date | null]) => void
}

export default function useCalendar(): CalendarProps {
  const [search, setSearch] = useSearchParams()
  const [date, setDate] = useState<[Date | null, Date | null]>([new Date(), new Date()])

  const setDateFilter = (data: [Date | null, Date | null]) => {
    const formattedDate = (string: string) => `${string.slice(6)}-${string.slice(3, 5)}-${string.slice(0, 2)}`

    setDate(data)
    search.set(
      calendarParam,
      `$btw:${formattedDate(data[0]!.toLocaleDateString())},${formattedDate(data[1]!.toLocaleDateString())}`,
    )
    setSearch(search, { replace: true })
  }

  useEffect(() => {
    if (search.has(calendarParam)) {
      // @ts-ignore
      setDate([new Date(search.get(calendarParam).slice(5, 15)), new Date(search.get(calendarParam).slice(16))])
    }
  }, [search])

  return {
    date,
    setDate,
    setDateFilter,
  }
}

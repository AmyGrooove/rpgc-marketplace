import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export const graphFilterParam = 'median_price'

export enum GraphFilterType {
  allTime = 'all_time',
  year = 'year',
  month = 'month',
  week = 'week',
}

type AllItemsFilter = {
  setAllTimeFilter: () => void;
  setYearFilter: () => void;
  setMonthFilter: () => void;
  setWeekFilter: () => void;
  activeFilter: GraphFilterType;
};

export function useGraphFilter(): AllItemsFilter {
  const [search, setSearch] = useSearchParams()
  const [activeFilter, setActiveFilter] = useState(GraphFilterType.allTime)

  const setAllTimeFilter = () => {
    search.set(graphFilterParam, GraphFilterType.allTime)
    setSearch(search, { replace: true })
  }

  const setYearFilter = () => {
    search.set(graphFilterParam, GraphFilterType.year)
    setSearch(search, { replace: true })
  }

  const setMonthFilter = () => {
    search.set(graphFilterParam, GraphFilterType.month)
    setSearch(search, { replace: true })
  }

  const setWeekFilter = () => {
    search.set(graphFilterParam, GraphFilterType.week)
    setSearch(search, { replace: true })
  }

  useEffect(() => {
    if (search.has(graphFilterParam)) {
      // @ts-ignore
      setActiveFilter(search.get(graphFilterParam))
    }
  }, [search])

  return {
    setAllTimeFilter,
    setYearFilter,
    setMonthFilter,
    setWeekFilter,
    activeFilter,
  }
}

import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const allItemsFilterParam = 'allItems'

export enum AllItemsFilterType {
  popular = 'popular',
  new = 'new',
}

type AllItemsFilter = {
  setPopularFilter: () => void,
  setNewFilter: () => void,
  activeFilter: AllItemsFilterType,
}

export function useFilter(): AllItemsFilter {
  const [search, setSearch] = useSearchParams()
  const [activeFilter, setActiveFilter] = useState(AllItemsFilterType.popular)

  const setPopularFilter = () => {
    search.set(allItemsFilterParam, AllItemsFilterType.popular)
    setSearch(search, { replace: true })
  }

  const setNewFilter = () => {
    search.set(allItemsFilterParam, AllItemsFilterType.new)
    setSearch(search, { replace: true })
  }

  useEffect(() => {
    if (search.has(allItemsFilterParam)) {
      // @ts-ignore
      setActiveFilter(search.get(allItemsFilterParam))
    }
  }, [search])

  return {
    setPopularFilter,
    setNewFilter,
    activeFilter,
  }
}

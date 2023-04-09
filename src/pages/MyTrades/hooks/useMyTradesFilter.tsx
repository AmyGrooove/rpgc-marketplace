import { useSearchParams } from 'react-router-dom'
import {useEffect, useState} from 'react'

const myTradesFilterParam = 'myTrades'

export enum MyTradesFilterType {
  trades = 'trades',
  offers = 'my-offers',
  history = 'history'
}

type MyTradesFilter = {
  setTradesFilter: () => void,
  setOffersFilter: () => void,
  setHistoryFilter: () => void,
  activeFilter: MyTradesFilterType,
}

export function useMyTradesFilter(): MyTradesFilter {
  const [search, setSearch] = useSearchParams()
  const [activeFilter, setActiveFilter] = useState(MyTradesFilterType.trades)

  const setTradesFilter = () => {
    search.set(myTradesFilterParam, MyTradesFilterType.trades)
    setSearch(search, { replace: true })
  }

  const setOffersFilter = () => {
    search.set(myTradesFilterParam, MyTradesFilterType.offers)
    setSearch(search, { replace: true })
  }

  const setHistoryFilter = () => {
    search.set(myTradesFilterParam, MyTradesFilterType.history)
    setSearch(search, { replace: true })
  }

  useEffect(() => {
    if (search.has(myTradesFilterParam)) {
      // @ts-ignore
      setActiveFilter(search.get(myTradesFilterParam))
    }
  }, [search])

  return {
    setTradesFilter,
    setOffersFilter,
    setHistoryFilter,
    activeFilter,
  }
}

import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const tradesDropdownParam = 'transactions'

export enum TradesDropdownType {
  all = 'all',
  buy = 'buy',
  sell = 'sell',
  exchange = 'exchange',
}

type TradesDropdownProps = {
  setAllTransactions: () => void,
  setBuyTransactions: () => void,
  setSellTransactions: () => void,
  setExchangeTransactions: () => void,
  activeMenu: TradesDropdownType
}

export default function useMyTradesDropdown(): TradesDropdownProps {
  const [search, setSearch] = useSearchParams()
  const [activeMenu, setActiveMenu] = useState(TradesDropdownType.all)

  const setAllTransactions = () => {
    search.set(tradesDropdownParam, TradesDropdownType.all)
    setSearch(search, {
      replace: true,
    })
  }

  const setBuyTransactions = () => {
    search.set(tradesDropdownParam, TradesDropdownType.buy)
    setSearch(search, {
      replace: true,
    })
  }

  const setSellTransactions = () => {
    search.set(tradesDropdownParam, TradesDropdownType.sell)
    setSearch(search, {
      replace: true,
    })
  }

  const setExchangeTransactions = () => {
    search.set(tradesDropdownParam, TradesDropdownType.exchange)
    setSearch(search, {
      replace: true,
    })
  }

  useEffect(() => {
    if (search.has(tradesDropdownParam)) {
      // @ts-ignore
      setActiveMenu(search.get(tradesDropdownParam))
    }
  }, [search])

  return {
    setAllTransactions,
    setBuyTransactions,
    setExchangeTransactions,
    setSellTransactions,
    activeMenu,
  }
}

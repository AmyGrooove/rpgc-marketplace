import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const priceSortParam = 'sortBy'

export enum PriceSortType {
  asc = 'minPrice:ASC',
  desc = 'minPrice:DESC',
  orderAsc = 'price:ASC',
  orderDesc = 'price:DESC',
}

type SortProps = {
  setAscSort: () => void
  setDescSort: () => void
  activePriceSort: PriceSortType
  setOrderAscSort: () => void
  setOrderDescSort: () => void
  activeOrderPriceSort: PriceSortType
}

export default function usePriceSort(): SortProps {
  const [search, setSearch] = useSearchParams()
  const [activePriceSort, setActivePriceSort] = useState(PriceSortType.asc)
  const [activeOrderPriceSort, setActiveOrderPriceSort] = useState(PriceSortType.orderAsc)

  const setAscSort = () => {
    search.set(priceSortParam, PriceSortType.asc)
    setSearch(search, { replace: true })
  }

  const setDescSort = () => {
    search.set(priceSortParam, PriceSortType.desc)
    setSearch(search, { replace: true })
  }

  const setOrderAscSort = () => {
    search.set(priceSortParam, PriceSortType.orderAsc)
    setSearch(search, { replace: true })
  }

  const setOrderDescSort = () => {
    search.set(priceSortParam, PriceSortType.orderDesc)
    setSearch(search, { replace: true })
  }

  useEffect(() => {
    if (search.has(priceSortParam)) {
      // @ts-ignore
      setActivePriceSort(search.get(priceSortParam))
      // @ts-ignore
      setActiveOrderPriceSort(search.get(priceSortParam))
    }
  }, [search, activePriceSort, activeOrderPriceSort])

  return {
    setAscSort,
    setDescSort,
    activePriceSort,
    setOrderAscSort,
    setOrderDescSort,
    activeOrderPriceSort,
  }
}

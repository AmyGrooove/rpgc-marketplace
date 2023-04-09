import {useParams, useSearchParams} from 'react-router-dom'
import { useEffect, useState } from 'react'

// import {AmplifyStore} from "../../../stores";
import {apiClient} from '../../../providers/api'
import {paginationDefaultValue, paginationParam} from '../../../hooks/usePagination'
import { priceSortParam, PriceSortType } from '../../../hooks/usePriceSort'

export const ordersListFilterParam = 'orderType'

export enum OrderListFilterType {
  sale = 'sale',
  buy = 'buy',
}

type OrdersFilter = {
  setSaleFilter: () => void,
  setBuyFilter: () => void,
  activeFilter: OrderListFilterType,
  saleOrdersCount: string,
  buyOrdersCount: string,
}

export function useOrdersFilter(): OrdersFilter {
  const urlParams = useParams()
  const [search, setSearch] = useSearchParams()
  const [activeFilter, setActiveFilter] = useState(OrderListFilterType.sale)
  const [saleOrdersCount, setSaleOrdersCount] = useState('')
  const [buyOrdersCount, setBuyOrdersCount] = useState('')

  const setSaleFilter = () => {
    search.set(paginationParam, paginationDefaultValue)
    search.set(priceSortParam, PriceSortType.orderAsc)
    search.set(ordersListFilterParam, OrderListFilterType.sale)
    setSearch(search, { replace: true })
  }

  const setBuyFilter = () => {
    search.set(paginationParam, paginationDefaultValue)
    search.set(priceSortParam, PriceSortType.orderAsc)
    search.set(ordersListFilterParam, OrderListFilterType.buy)
    setSearch(search, { replace: true })
  }

  useEffect(() => {
    if (search.has(ordersListFilterParam)) {
      // @ts-ignore
      setActiveFilter(search.get(ordersListFilterParam))
    }
  }, [search])

  useEffect(() => {
    apiClient.get(`/shop/${urlParams.listingId}/offers`, {
      params: {
        'filter.side': OrderListFilterType.sale,
        limit: 1,
      }})
      .then(res => setSaleOrdersCount(res.data.meta.totalItems))
      .catch(console.error)

    apiClient.get(`/shop/${urlParams.listingId}/offers`, {
      params: {
        'filter.side': OrderListFilterType.buy,
        limit: 1,
      }})
      .then(res => setBuyOrdersCount(res.data.meta.totalItems))
      .catch(console.error)
  }, [])

  return {
    setSaleFilter,
    setBuyFilter,
    activeFilter,
    saleOrdersCount,
    buyOrdersCount,
  }
}

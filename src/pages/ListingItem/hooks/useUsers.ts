import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import { apiClient } from '../../../providers/api'
import { PaginationParams } from '../../../dependencies/constants/types'
import { PriceSortType } from '../../../hooks/usePriceSort'
import { MarketplaceStore } from '../../../stores'

import { OrderListFilterType } from './useOrdersFilter'

interface useItemsProps {
  params: {
    page: string;
    sortBy: PriceSortType;
  };
  activeFilter: OrderListFilterType;
}

export type IUser = {
  id: string;
  username: string;
  avatar: string;
  price: string;
  exchange: boolean;
  userId: string;
};

export default function useUsers({ params, activeFilter }: useItemsProps) {
  const urlParams = useParams()
  const { UpdateSingleItem, reload } = MarketplaceStore

  const [search] = useSearchParams(params)
  const [users, setUsers] = useState<IUser[]>([])

  const [pagination, setPagination] = useState<PaginationParams>()

  useEffect(() => {
    UpdateSingleItem(urlParams.listingId || '')
  }, [])

  useEffect(() => {
    apiClient
      .get(`/shop/${urlParams.listingId}/offers`, {
        params: {
          page: search.get('page'),
          sortBy: search.get('sortBy'),
          'filter.side': activeFilter,
        },
      })
      .then((res) => {
        setUsers(res.data.data)
        setPagination(res.data.meta)
      })
      .catch(console.error)
  }, [search, activeFilter, reload])

  return {
    users,
    pagination,
  }
}

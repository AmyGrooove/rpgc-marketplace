import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { apiClient } from '../../../providers/api'
import { Item, PaginationParams } from '../../../dependencies/constants/types'
import { PriceSortType } from '../../../hooks/usePriceSort'
import {AmplifyStore} from '../../../stores'

interface useItemsProps {
  params: {
    sortBy: PriceSortType
    page: string
  }
}

export default function useItems({
  params,
}: useItemsProps) {
  const {user} = AmplifyStore
  const [search] = useSearchParams(params)
  const [items, setItems] = useState<Item[]>([])
  const [pagination, setPagination] = useState<PaginationParams>()

  useEffect(() => {
    apiClient.get('/shop', {
      params: search,
      headers: {Authorization: 'Bearer ' + user.jwtToken},
    })
      .then(res => {
        setItems(res.data.data)
        setPagination(res.data.meta)
      })
      .catch(console.error)
  }, [search])

  return {
    items,
    pagination,
  }
}

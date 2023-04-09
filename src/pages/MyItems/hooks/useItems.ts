import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { apiClient } from '../../../providers/api'
import { Item, PaginationParams } from '../../../dependencies/constants/types'
import { AmplifyStore, MarketplaceStore } from '../../../stores'

// import { PriceSortType } from '../../../hooks/usePriceSort'

interface useItemsProps {
  params: {
    // sortBy: PriceSortType
    page: string
  }
}

export default function useItems({ params }: useItemsProps) {
  const { reload } = MarketplaceStore

  const [search] = useSearchParams(params)
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState<PaginationParams>()

  // TODO Прикинуть варианты оптимизации (использовать запрос с передачей jwt токена)
  useEffect(() => {
    AmplifyStore.checkUserSession().then(() => {
      setLoading(true)
      apiClient
        .get(`/user/${AmplifyStore.user.id}/inventory`, { params: search })
        .then((res) => {
          setLoading(false)
          setItems(res.data.data)
          setPagination(res.data.meta)
        })
        .catch((error) => {
          setLoading(false)
          console.log(error)
        },
        )
    })
  }, [search, reload])

  return {
    items,
    pagination,
    loading,
  }
}

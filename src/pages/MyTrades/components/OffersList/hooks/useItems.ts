import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { OrderListFilterType } from '../../../../ListingItem/hooks/useOrdersFilter'
import { PaginationParams } from '../../../../../dependencies/constants/types'
import { apiClient } from '../../../../../providers/api'
import { AmplifyStore, MarketplaceStore } from '../../../../../stores'

export type Item = {
  id: string;
  price: string;
  side: OrderListFilterType;
  createdAt: string; // "2022-10-10T23:20:24.148Z"
  exchange: true;
  item: {
    id: string;
    desc: string;
    icon: string;
  };
};

export default function useItems() {
  const { user } = AmplifyStore
  const { reload } = MarketplaceStore

  const [search] = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [offersList, setOffersList] = useState<Item[]>([])
  const [pagination, setPagination] = useState<PaginationParams>()

  const [changedOffer, setChangedOffer] = useState(false)

  const deleteHandler = (item: Item) => {
    apiClient
      .delete(`/offer/${item.id}`, {
        headers: { Authorization: 'Bearer ' + user.jwtToken },
      })
      .then((res) => setChangedOffer(true))
      .catch(console.error)
  }

  useEffect(() => {
    setLoading(true)
    apiClient
      .get('/user/orders', {
        headers: { Authorization: 'Bearer ' + user.jwtToken },
      })
      .then((res) => {
        setLoading(false)
        setOffersList(res.data.data)
        setPagination(res.data.meta)
        setChangedOffer(false)
      })
      .catch(error => {
        setLoading(false)
        console.log(error)
      })
  }, [search, changedOffer, reload])

  return {
    offersList,
    pagination,
    deleteHandler,
    changedOffer,
    loading,
  }
}

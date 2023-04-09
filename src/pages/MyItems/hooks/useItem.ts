import { useEffect, useState } from 'react'

import { apiClient } from '../../../providers/api'
import { Item } from '../../../dependencies/constants/types'
import { AmplifyStore } from '../../../stores'
import { OrderListFilterType } from '../../ListingItem/hooks/useOrdersFilter'

export default function useItem() {
  const [saleOfferAdded, setSaleOfferAdded] = useState(false)
  const { user } = AmplifyStore

  // TODO здесь определиться с типом (добавить статус предмета(в продаже или нет))
  const addSaleOffer = (item: Item) => {
    apiClient.post('/offer', {
      'itemId': item.id,
      'price': 999,
      'side': OrderListFilterType.sale,
      'exchange': true,
    },
    {
      headers: { Authorization: 'Bearer ' + user.jwtToken },
    })
      .then(res => {
        setSaleOfferAdded(true)
        window.location.reload()
      })
      .catch(console.error)
  }

  return {
    addSaleOffer,
    saleOfferAdded,
  }
}

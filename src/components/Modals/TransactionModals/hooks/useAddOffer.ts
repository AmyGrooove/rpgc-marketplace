import { useContext, useState } from 'react'

import { OrderListFilterType } from '../../../../pages/ListingItem/hooks/useOrdersFilter'
import { apiClient } from '../../../../providers/api'
import { AmplifyStore, MarketplaceStore } from '../../../../stores'
import TransactionContext from '../components/TransactionContext'

const useAddOffer = () => {
  const { user } = AmplifyStore
  const { setReload } = MarketplaceStore
  const { setModal } = useContext(TransactionContext)
  const { singleItem } = MarketplaceStore

  const [newPrice, setNewPrice] = useState<string>('')
  const [canExchange, setCanExchange] = useState<boolean>(false)

  const setNewPriceText = (value: string) => {
    if (
      !value.replace(/ /g, '').match('^[0-9]*[.,]?[0-9]{0,18}$') ||
      value.length > 15
    ) {
      return
    }

    setNewPrice(value.replace(/,/g, '.'))
  }

  const addSaleOffer = () => {
    setReload(true)

    apiClient
      .post(
        '/offer',
        {
          itemId: singleItem.id,
          price: Number(newPrice),
          side: OrderListFilterType.sale,
          exchange: canExchange,
        },
        {
          headers: { Authorization: 'Bearer ' + user.jwtToken },
        },
      )
      .then(() => {
        setModal(null)
        setReload(false)
      })
      .catch((error) => {
        console.log(error)
        setReload(false)
      })
  }

  return {
    newPrice,
    setNewPriceText,
    canExchange,
    setCanExchange,
    addSaleOffer,
  }
}

export default useAddOffer

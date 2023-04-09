import { useContext, useState } from 'react'

import { apiClient } from '../../../../providers/api'
import { AmplifyStore, MarketplaceStore } from '../../../../stores'
import TransactionContext from '../components/TransactionContext'

const useEditOffer = () => {
  const { user } = AmplifyStore
  const { setReload } = MarketplaceStore

  const { specificParams, setModal } = useContext(TransactionContext)

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

  const editHandler = () => {
    setReload(true)

    apiClient
      .patch(
        `/offer/${specificParams.offerId}`,
        {
          price: Number(newPrice),
          exchange: canExchange,
        },
        { headers: { Authorization: 'Bearer ' + user.jwtToken } },
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
    editHandler,
  }
}

export default useEditOffer

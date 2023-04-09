import { useContext, useEffect, useState } from 'react'

import TransactionContext from '../components/TransactionContext'
import { AmplifyStore, ExchangeStore } from '../../../../stores'
import { apiClient } from '../../../../providers/api'

const useExchange = () => {
  const [activePriceSort, setActivePriceSort] = useState('1')

  const { setDisableLeftPannel, specificParams, setStep, tranType } =
    useContext(TransactionContext)

  const { copyItems, applyItems, updateItems, items } = ExchangeStore
  const { user } = AmplifyStore

  useEffect(() => {
    updateItems(tranType, specificParams.saleId || '')
  }, [])

  const openList = () => {
    copyItems()
    setDisableLeftPannel(true)
  }

  const goBack = () => {
    setDisableLeftPannel(false)
  }

  const goContinue = () => {
    applyItems()
    setDisableLeftPannel(false)
  }

  const sumbitOffer = () => {
    apiClient
      .put(
        `/offer/${specificParams.offerId}/exchange`,
        {
          itemIds: items.map((item) => item.id).filter((item) => item !== '0'),
        },
        { headers: { Authorization: 'Bearer ' + user.jwtToken } },
      )
      .then(() => {
        setStep(2)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return {
    openList,
    goBack,
    goContinue,
    sumbitOffer,
    activePriceSort,
    setActivePriceSort,
  }
}

export default useExchange

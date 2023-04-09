import { useState, useMemo, useEffect } from 'react'

import {
  Buy,
  Sale,
  Exchange,
  ConnectWallet,
  NotEnoughMoney,
  AddOffer,
  EditOffer,
} from '../DialogBox'
import {
  LASTONEARTH_ICON,
  LEGENDARY_ICON,
  RARE_ICON,
  SPECIAL_ICON,
} from '../../../../theme/sources'
import {
  AmplifyStore,
  ExchangeStore,
  MarketplaceStore,
} from '../../../../stores'
import { Web3Store } from '../../../../stores'
import TransactionStore from '../../../../stores/TransactionStore'
import { ISpecificParams } from '../components/interfaces'

const useTransaction = (
  tranType: string,
  id: string,
  rare?: string,
  specificParams?: ISpecificParams,
) => {
  const { startItems } = ExchangeStore
  const { isConnected } = Web3Store
  const { userBalance, commission, price, setUser } = TransactionStore
  const { user } = AmplifyStore
  const { UpdateSingleItem, reload } = MarketplaceStore

  const [transactionType, setTransactionType] = useState<string>(tranType)
  const [step, setStep] = useState<number>(0)
  const [disableLeftPannel, setDisableLeftPannel] = useState<boolean>(false)

  useEffect(() => {
    if (specificParams?.saleName !== undefined) {
      setUser(specificParams.saleName, specificParams.saleIcon || '')
    }

    UpdateSingleItem(id)
  }, [id])

  useEffect(() => {
    setStep(step)
  }, [reload])

  useEffect(() => {
    if (
      ((tranType === 'buy' || tranType === 'sale') && !isConnected) ||
      !user.authenticated
    ) {
      setTransactionType('connect')
    } else if (
      Number(userBalance) < Number(price) + Number(commission) &&
      tranType === 'buy'
    ) {
      setTransactionType('notenoughmoney')
    } else {
      setTransactionType(tranType)
    }
  }, [userBalance, price, commission, isConnected])

  const selectTransaction = () => {
    return {
      buy: <Buy />,
      sale: <Sale />,
      exchangemy: <Exchange user={true} />,
      exchangeuser: <Exchange user={false} />,
      connect: <ConnectWallet />,
      notenoughmoney: <NotEnoughMoney />,
      addsaleoffer: <AddOffer mode={false} />,
      addbuyoffer: <AddOffer mode={true} />,
      editoffer: <EditOffer />,
    }[transactionType.toLowerCase()]
  }

  useMemo(() => {
    if (tranType === 'exchangemy' || tranType === 'exchangeuser') {
      startItems()
    }
  }, [tranType])

  const selectRare = () => {
    return {
      rare: RARE_ICON,
      special: SPECIAL_ICON,
      legendary: LEGENDARY_ICON,
      last: LASTONEARTH_ICON,
    }[(rare || '').toLowerCase()]
  }

  return {
    selectTransaction,
    step,
    setStep,
    setTransactionType,
    selectRare,
    disableLeftPannel,
    setDisableLeftPannel,
  }
}

export default useTransaction

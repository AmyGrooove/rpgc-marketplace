import { useContext } from 'react'

import ConfirmationStep from '../../components/ConfirmationStep'
import { IExchange } from '../../components/interfaces'
import TransactionContext from '../../components/TransactionContext'

import ExchangePrice from './ExchangePrice'
import ExchangeStep1 from './ExchangeStep1'
import ExchangeStep2 from './ExchangeStep2'

import './ExchangeStyles.scss'

import ItemsList from './ItemsList'

const Exchange = ({ user }: IExchange) => {
  const { step, disableLeftPannel, tranType } = useContext(TransactionContext)

  return (
    <>
      {disableLeftPannel ? (
        <ItemsList user={tranType === 'exchangemy' ? true : false} />
      ) : (
        <>
          {step === 0 && <ExchangeStep1 user={user} />}
          {step === 1 && <ConfirmationStep PriceJSX={ExchangePrice} />}
          {step === 2 && <ExchangeStep2 />}
        </>
      )}
    </>
  )
}

export default Exchange

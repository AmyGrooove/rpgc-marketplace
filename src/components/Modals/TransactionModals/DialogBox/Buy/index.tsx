import { useContext } from 'react'

import ConfirmationStep from '../../components/ConfirmationStep'
import ResultStep from '../../components/ResultStep'
import TransactionContext from '../../components/TransactionContext'
import useBuy from '../../hooks/useBuy'

import BuyPrice from './BuyPrice'
import BuyStep1 from './BuyStep1'
import BuyStep3 from './BuyStep3'

const Buy = () => {
  const { step } = useContext(TransactionContext)
  const { success } = useBuy()

  return (
    <>
      {step === 0 && <BuyStep1 />}
      {step === 1 && <ConfirmationStep PriceJSX={BuyPrice} />}
      {step === 2 && <BuyStep3 />}
      {step === 3 && (
        <ResultStep
          successText={'You are now the owner of this item.'}
          success={success}
        />
      )}
    </>
  )
}

export default Buy

import { useContext } from 'react'

import ResultStep from '../../components/ResultStep'
import TransactionContext from '../../components/TransactionContext'
import useSale from '../../hooks/useSale'
import ConfirmationStep from '../../components/ConfirmationStep'

import SaleStep1 from './SaleStep1'
import SalePrice from './SalePrice'

const Sale = () => {
  const { step } = useContext(TransactionContext)
  const { success } = useSale()

  return (
    <>
      {step === 0 && <SaleStep1 />}
      {step === 1 && <ConfirmationStep PriceJSX={SalePrice} />}
      {step === 2 && (
        <ResultStep
          successText={'You transferred item to another owner.'}
          success={success}
        />
      )}
    </>
  )
}

export default Sale

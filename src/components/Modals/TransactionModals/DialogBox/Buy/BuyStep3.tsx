import { useContext } from 'react'

import CancelButton from '../../components/CancelButton'
import {
  BUY_ICON,
  CONFIRM_ICON,
  LOADING_ICON,
} from '../../../../../theme/sources'
import TransactionContext from '../../components/TransactionContext'
import useBuy from '../../hooks/useBuy'

const BuyStep3 = () => {
  const { setStep } = useContext(TransactionContext)
  const { loading } = useBuy()

  return (
    <>
      <div className="main-block padding-bottom-block">
        <div className="title-text padding-bottom">Confirmation</div>
        <div className="success-block">
          <img src={CONFIRM_ICON} alt="" />
          <div className="mini-title-text2">
            Please confirm the transaction in your crypto wallet.
          </div>
        </div>
      </div>
      <div className="buttons">
        <CancelButton />
        <button
          className="sumbit-button"
          disabled={loading}
          onClick={() => setStep(3)}
        >
          <img
            src={loading ? LOADING_ICON : BUY_ICON}
            id={loading ? 'loading' : ''}
            alt=""
          />
          <div>{loading ? 'Please, Wait' : 'Yes, Confirm'}</div>
        </button>
      </div>
    </>
  )
}

export default BuyStep3

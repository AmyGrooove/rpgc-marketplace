import { useContext } from 'react'

import { MY_ITEM_ICON, WAIT_ICON } from '../../../../../theme/sources'
import CancelButton from '../../components/CancelButton'
import TransactionContext from '../../components/TransactionContext'

const ExchangeStep2 = () => {
  const { setModal } = useContext(TransactionContext)

  return (
    <>
      <div className="main-block padding-bottom-block">
        <div className="title-text padding-bottom">Exchange in Progress</div>
        <div className="success-block">
          <img src={WAIT_ICON} alt="" />
          <div className="mini-title-text2">
            Your offer is under consideration by the seller. Please wait.
          </div>
        </div>
      </div>
      <div className="buttons">
        <CancelButton />
        <a className="sumbit-link" href="/my-trades?myTrades=my-offers">
          <button className="sumbit-button" onClick={() => setModal(null)}>
            <img src={MY_ITEM_ICON} alt="" />
            <div>Go My Offers</div>
          </button>
        </a>
      </div>
    </>
  )
}

export default ExchangeStep2

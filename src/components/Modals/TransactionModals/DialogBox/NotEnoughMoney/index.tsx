import { useContext } from 'react'

import { CIRCLE_ICON, UNSUCCESS_ICON } from '../../../../../theme/sources'
import CancelButton from '../../components/CancelButton'
import TransactionContext from '../../components/TransactionContext'

const NotEnoughMoney = () => {
  const { setModal } = useContext(TransactionContext)

  return (
    <>
      <div className="main-block padding-bottom-block">
        <div className="title-text padding-bottom">Not enough coins</div>
        <div className="success-block">
          <img src={UNSUCCESS_ICON} alt="" />
          <div className="mini-title-text2">
            You don't have enough coins in your wallet to buy this item.
          </div>
        </div>
      </div>
      <div className="buttons">
        <CancelButton />
        <a
          href="https://account.rpgc.io/"
          target="_blank"
          style={{ textDecoration: 'none' }}
          rel="noreferrer"
        >
          <button className="sumbit-button" onClick={() => setModal(null)}>
            <img src={CIRCLE_ICON} alt="" />
            <div>Buy RPGC</div>
          </button>
        </a>
      </div>
    </>
  )
}

export default NotEnoughMoney

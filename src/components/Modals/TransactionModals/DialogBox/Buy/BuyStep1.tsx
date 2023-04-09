import { useContext } from 'react'

import { getAvatar } from '../../../../../dependencies/helper/getAvatar'
import TransactionStore from '../../../../../stores/TransactionStore'
import { BUY_ICON, MINI_RPGC_LOGO } from '../../../../../theme/sources'
import CancelButton from '../../components/CancelButton'
import TransactionContext from '../../components/TransactionContext'

const BuyStep1 = () => {
  const { setStep, specificParams } = useContext(TransactionContext)
  const { saleName, price, commission } = TransactionStore

  return (
    <>
      <div className="main-block padding-bottom-block">
        <div className="title-text padding-bottom">Buy Item</div>
        <div className="tran-row padding-bottom2 border-bottom">
          <div className="mini-title-text1">Salesman</div>
          <div className="row-desc">
            <img src={getAvatar(specificParams.saleId)} alt="" />
            <div className="white-text1">{saleName}</div>
          </div>
        </div>
        <div className="tran-row padding-top1 padding-bottom1">
          <div className="mini-title-text1">Price</div>
          <div className="row-desc">
            <div className="white-text2">{price}</div>
            <div className="rpgc-token">
              <img src={MINI_RPGC_LOGO} alt="" />
              <div className="rpgc-text">RPGC</div>
            </div>
          </div>
        </div>
        <div className="tran-row padding-top1 border-top">
          <div className="mini-title-text1">Commission 0.5% </div>
          <div className="row-desc">
            <div className="white-text2">{commission}</div>
            <div className="rpgc-token">
              <img src={MINI_RPGC_LOGO} alt="" />
              <div className="rpgc-text">RPGC</div>
            </div>
          </div>
        </div>
      </div>
      <div className="buttons-info">
        <div className="alert-block">
          <div className="alert-icon">!</div>
          <div className="alert-text">
            Transaction will be checked. In case of payment of an insufficient
            amount of tokens, the item will not be purchased and the paid tokens
            will be lost forever.
          </div>
        </div>
        <div className="buttons">
          <CancelButton />
          <button className="sumbit-button" onClick={() => setStep(1)}>
            <img src={BUY_ICON} alt="" />
            <div>{(Number(price) + Number(commission)).toFixed(4)} RPGC</div>
          </button>
        </div>
      </div>
    </>
  )
}

export default BuyStep1

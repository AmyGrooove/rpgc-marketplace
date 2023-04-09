import { observer } from 'mobx-react-lite'
import { useContext } from 'react'

import { getAvatar } from '../../../../../dependencies/helper/getAvatar'
import { ExchangeStore } from '../../../../../stores'
import TransactionStore from '../../../../../stores/TransactionStore'
import { EXCHANGE_ICON } from '../../../../../theme/sources'
import CancelButton from '../../components/CancelButton'
import { IExchange } from '../../components/interfaces'
import TransactionContext from '../../components/TransactionContext'
import useExchange from '../../hooks/useExchange'

import AddBlock from './AddBlock'

const ExchangeStep1 = observer(({ user }: IExchange) => {
  const { setStep, specificParams } = useContext(TransactionContext)
  const { saleName } = TransactionStore
  const { items } = ExchangeStore
  const { openList } = useExchange()

  return (
    <>
      <div className="main-block">
        <div className="title-text padding-bottom">Exchange Item</div>
        <div className="tran-row padding-bottom2 border-bottom">
          <div className="mini-title-text1">{user ? 'Owner' : 'Recipient'}</div>
          <div className="row-desc">
            <img src={getAvatar(specificParams.saleId)} alt="" />
            <div className="white-text1">{saleName}</div>
          </div>
        </div>
        <div className="tran-row padding-top1">
          <div className="mini-title-text1">
            {user ? 'Offer in Return' : 'Want Get'}
          </div>
          <div className="gray-button-container">
            <button className="gray-button" onClick={openList}>
              {user ? 'View my items' : 'View user items'}
            </button>
          </div>
        </div>
      </div>
      <AddBlock />
      <div className="buttons">
        <CancelButton />
        <button
          className="sumbit-button"
          onClick={() => setStep(1)}
          disabled={items.length === 0}
        >
          <img src={EXCHANGE_ICON} alt="" />
          <div>Sumbit Offer</div>
        </button>
      </div>
    </>
  )
})

export default ExchangeStep1

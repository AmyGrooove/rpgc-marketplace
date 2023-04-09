import { observer } from 'mobx-react-lite'

import useTransaction from '../hooks/useTransaction'

import ItemInfo from './ItemInfo'
import RareDiv from './RareDiv'

import './TransactionOverlayStyles.scss'
import '../components/ComponentsStyles.scss'
import { ITransactionOverlay } from '../components/interfaces'
import useModal from '../../ModalProvider/useModal'
import TransactionContext from '../components/TransactionContext'
import { MarketplaceStore } from '../../../../stores'

const TransactionOverlay = observer(
  ({
    id,
    rare,
    tranType,
    backButton = false,
    specificParams = {},
  }: ITransactionOverlay) => {
    const { setModal } = useModal()
    const { reload } = MarketplaceStore

    const {
      selectTransaction,
      step,
      setStep,
      selectRare,
      disableLeftPannel,
      setDisableLeftPannel,
    } = useTransaction(tranType, id, rare, specificParams)

    return (
      <TransactionContext.Provider
        value={{
          step,
          setStep,
          setModal,
          selectRare,
          disableLeftPannel,
          setDisableLeftPannel,
          tranType,
          backButton,
          specificParams,
        }}
      >
        <div className="transaction-container" id={rare}>
          <div
            className="item"
            style={{ display: !disableLeftPannel ? '' : 'none' }}
          >
            {!reload && (
              <>
                <RareDiv />
                <ItemInfo />
              </>
            )}
          </div>
          <div
            style={{ padding: !disableLeftPannel ? '' : '0px' }}
            className="dialog"
          >
            {selectTransaction()}
          </div>
        </div>
      </TransactionContext.Provider>
    )
  },
)

export default TransactionOverlay

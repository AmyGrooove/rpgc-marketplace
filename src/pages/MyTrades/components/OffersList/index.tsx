import ItemInfo from '../common/ItemInfo'
import './index.scss'
import TypeAndDate from '../common/TypeAndDate'
import RpgcValue from '../../../../components/common/RpgcValue'
import useModal from '../../../../components/Modals/ModalProvider/useModal'
import TransactionOverlay from '../../../../components/Modals/TransactionModals/TransactionOverlay'
import ModalOverlay from '../../../../components/Modals/ModalOverlay'
import useMobile from '../../../../hooks/useMobile'
import NoTransactions from '../NoTransactions'
import ConfirmationModal from '../common/ConfirmationModal'

import Actions from './components/Actions'
import useItems, { Item } from './hooks/useItems'

import { observer } from 'mobx-react-lite'
import { useState } from 'react'

const OffersList = observer(() => {
  const [modalVisible, setModalVisible] = useState(false)
  const [deletingOffer, setDeletingOffer] = useState<Item>()
  const { offersList, deleteHandler, loading } = useItems()
  const { setModal } = useModal()
  const { mobile } = useMobile()

  return (
    <div className={'offers-list'}>
      {offersList.map((offer, index) => (
        <div className={'row'} key={index}>
          <div className={'left'}>
            <ItemInfo icon={offer.item.icon} name={offer.item.desc} />
            {mobile && <RpgcValue value={offer.price} />}
          </div>
          <div className={'right'}>
            <TypeAndDate
              type={offer.side}
              exchange={offer.exchange}
              date={offer.createdAt}
            />
            {!mobile && <RpgcValue value={offer.price} />}
            <Actions
              editHandler={() =>
                setModal(
                  <ModalOverlay>
                    <TransactionOverlay
                      id={offer.item.id}
                      tranType="editoffer"
                      specificParams={{ offerId: offer.id }}
                    />
                  </ModalOverlay>,
                )
              }
              deleteHandler={() => {
                setModalVisible(!modalVisible)
                setDeletingOffer(offer)
              }}
            />
          </div>
        </div>
      ))}
      {!loading && offersList.length === 0 && <NoTransactions />}
      {modalVisible && (
        <ConfirmationModal
          closeModal={() => setModalVisible(false)}
          actionFunction={() => deleteHandler(deletingOffer!)}
          action={'Delete'}
        />
      )}
    </div>
  )
})

export default OffersList

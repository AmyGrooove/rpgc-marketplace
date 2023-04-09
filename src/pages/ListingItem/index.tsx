import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'


import './index.scss'
import { Icon } from '../../components/common'
import { MarketplaceStore } from '../../stores'
import useModal from '../../components/Modals/ModalProvider/useModal'
import ModalOverlay from '../../components/Modals/ModalOverlay'
import TransactionOverlay from '../../components/Modals/TransactionModals/TransactionOverlay'
import useMobile from '../../hooks/useMobile'

import Actions from './components/Actions'
import { Toolbar, ItemCard, OrdersList, ItemPrice } from './components'

const ListingItem = observer(() => {
  const { singleItem } = MarketplaceStore
  const { setModal } = useModal()
  const { mobile } = useMobile()
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const card: HTMLElement | null = document.querySelector('.card-price')

    const inViewHandler = () => {
      const scrollPosition = window.scrollY + 120

      if (card && scrollPosition > card.offsetTop) {
        setInView(true)
      }
      if (window.scrollY < 70) {
        setInView(false)
      }
    }

    window.addEventListener('scroll', inViewHandler)
    return () => {
      window.removeEventListener('scroll', inViewHandler)
    }
  }, [inView])

  return (
    <div className={'main-container'}>
      <div className={'left-container'}>
        <Actions />
        <div
          className={classNames(
            'card-price',
            !mobile && inView && 'fixed',
          )}
        >
          <ItemCard icon={singleItem.img} name={singleItem.name} />
          <ItemPrice
            minValue={singleItem.minPrice}
            maxValue={singleItem.maxPrice}
          />
        </div>
      </div>
      <div className={'right-container'}>
        <Toolbar />
        <OrdersList />
      </div>
      {mobile && (
        <div
          className={'mobile-red-btn'}
          onClick={() =>
            setModal(
              <ModalOverlay>
                <TransactionOverlay id={singleItem.id} tranType="addbuyoffer" />
              </ModalOverlay>,
            )
          }
        >
          <Icon icon={'redCircleAdd'} />
        </div>
      )}
    </div>
  )
})

export default ListingItem

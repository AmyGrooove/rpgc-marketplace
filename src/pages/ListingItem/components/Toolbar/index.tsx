import './index.scss'
import { useState } from 'react'

import { Icon } from '../../../../components/common'
import DropdownMenu from '../../../../components/common/DropdownMenu'
import usePriceSort, { PriceSortType } from '../../../../hooks/usePriceSort'
import MobileFilter from '../../../AllItems/components/MobileFilter'
import useModal from '../../../../components/Modals/ModalProvider/useModal'
import { AmplifyStore, MarketplaceStore } from '../../../../stores'
import ModalOverlay from '../../../../components/Modals/ModalOverlay'
import TransactionOverlay from '../../../../components/Modals/TransactionModals/TransactionOverlay'
import useMobile from '../../../../hooks/useMobile'
import MobileFilterContainer from '../../../../components/MobileFilterContainer'
import Tooltip from '../../../../components/Tooltip'

import FilterButtons from './components/FilterButtons/index'
import { Exchange } from './components/Exchange'

export function Toolbar() {
  const { mobile } = useMobile()
  const [sortVisible, setSortVisible] = useState(false)

  const { activeOrderPriceSort, setOrderAscSort, setOrderDescSort } =
    usePriceSort()

  const dropdownMenuItems = [
    {
      name: 'High price',
      clickHandler: () => {
        setOrderDescSort()
        setSortVisible(false)
      },
      type: PriceSortType.orderDesc,
    },
    {
      name: 'Low price',
      clickHandler: () => {
        setOrderAscSort()
        setSortVisible(false)
      },
      type: PriceSortType.orderAsc,
    },
  ]

  const { singleItem } = MarketplaceStore
  const { setModal } = useModal()
  const { user } = AmplifyStore

  return (
    <div className={'toolbar'}>
      <div className={'right-bar'}>
        <div className={'right'}>
          <FilterButtons />
        </div>
        <div className={'left'}>
          <Exchange />
          <DropdownMenu
            dropdownMenuItems={dropdownMenuItems}
            activeMenu={activeOrderPriceSort}
          />
          <Tooltip text={'Add offer'}>
            <Icon
              className={'add'}
              icon={'redCircleAdd'}
              onClick={
                !user.authenticated
                  ? () => {}
                  : () =>
                    setModal(
                      <ModalOverlay>
                        <TransactionOverlay
                          id={singleItem.id}
                          tranType="addbuyoffer"
                        />
                      </ModalOverlay>,
                    )
              }
            />
          </Tooltip>
        </div>
      </div>
      {mobile && (
        <div className={'mobile-left'}>
          <MobileFilter
            icon={'sortIcon'}
            name={'Sort'}
            onClick={() => setSortVisible(!sortVisible)}
          />
        </div>
      )}
      {sortVisible && (
        <MobileFilterContainer
          onClose={() => setSortVisible(false)}
          filterName={'Price Sort'}
        >
          <DropdownMenu
            dropdownMenuItems={dropdownMenuItems}
            activeMenu={activeOrderPriceSort}
          />
        </MobileFilterContainer>
      )}
    </div>
  )
}

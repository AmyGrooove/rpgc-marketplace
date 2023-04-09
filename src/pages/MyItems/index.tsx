import './index.scss'
import { observer } from 'mobx-react-lite'

import { Icon, ItemCard, SearchBar } from '../../components/common'
import CategoriesFilter from '../../components/CategoriesFilter/CategoriesFilter'
import { Pagination } from '../../components/Pagination'
import { usePagination } from '../../hooks/usePagination'
import useItems from '../MyItems/hooks/useItems'
// TODO почистить временные данные (импорт и сам файл)
import { CARD_CONTENT } from '../../theme/sources'
import useModal from '../../components/Modals/ModalProvider/useModal'
import ModalOverlay from '../../components/Modals/ModalOverlay'
import TransactionOverlay from '../../components/Modals/TransactionModals/TransactionOverlay'
import useMobile from '../../hooks/useMobile'

import Toolbar from './components/Toolbar'
import NoItemsPage from './components/NoItemsPage'
import useItem from './hooks/useItem'
import MobileToolbar from './components/MobileToolbar'

const MyItems = observer(() => {
  const { currentPage, debouncedPageChangeHandler } = usePagination()
  const { saleOfferAdded } = useItem()
  const { setModal } = useModal()
  const { mobile } = useMobile()

  const { items, pagination, loading } = useItems({ params: { page: currentPage } })

  return (
    <div className={'my-items'}>
      {!mobile && (
        <div className={'left-panel'}>
          <SearchBar />
          <CategoriesFilter />
        </div>
      )}
      <div className={'content-container'}>
        {mobile ? <MobileToolbar /> : <Toolbar />}
        <div className={'item-cards-container'}>
          {!loading && items.length === 0 && <NoItemsPage />}
          {items.map((item, index) => (
            <ItemCard
              key={index}
              itemImg={item.icon}
              itemName={item.desc}
              rarity={'standard'}
              saleOfferAdded={index === 3 ? true : saleOfferAdded}
              onClick={() => {}}
            >
              {saleOfferAdded || index === 3 ? (
                <>
                  <span>Up sale for</span>
                  <span className={'item-price'}>
                    <span
                      // style={{
                      //   fontSize: item.minPrice.length > 7 ? mobile ? '13px' : '14px' : mobile ? '14px' : '16px',
                      // }}
                    >
                      1.4285
                    </span>
                    <Icon icon="logoDarkIcon" className={'price-icon'} />
                  </span>
                </>
              ) : (
                <div
                  className={'sale-actions'}
                  onClick={() =>
                    setModal(
                      <ModalOverlay>
                        <TransactionOverlay
                          id={item.id}
                          tranType="addsaleoffer"
                        />
                      </ModalOverlay>,
                    )
                  }
                >
                  <Icon icon="sale" className={'sale-icon'} />
                  <span>Add Sale offer</span>
                </div>
              )}
            </ItemCard>
          ))}

          <Pagination
            currentPage={currentPage}
            totalPages={pagination?.totalPages.toString() ?? '0'}
            onPageChange={debouncedPageChangeHandler}
          />
        </div>
      </div>
    </div>
  )
})

export default MyItems

import { observer } from 'mobx-react-lite'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import PriceFilter from '../../components/PriceFilter/PriceFilter'
import { SearchBar, ItemCard, Icon } from '../../components/common'
import './index.scss'
import CategoriesFilter from '../../components/CategoriesFilter/CategoriesFilter'
import { Pagination } from '../../components/Pagination'
import { usePagination } from '../../hooks/usePagination'
import TransactionOverlay from '../../components/Modals/TransactionModals/TransactionOverlay'
import useModal from '../../components/Modals/ModalProvider/useModal'
import ModalOverlay from '../../components/Modals/ModalOverlay'
import usePriceSort from '../../hooks/usePriceSort'
import useMobile from '../../hooks/useMobile'

import MobileToolbar from './components/MobileToolbar'
import useItems from './hooks/useItems'
import Toolbar from './components/Toolbar'
import NoResultsPage from './components/NoResultsPage'

const AllItems = observer(() => {
  const { currentPage, debouncedPageChangeHandler } = usePagination()
  const [search] = useSearchParams()
  const searchValue = search.get('search')
  const { activePriceSort } = usePriceSort()
  const { items, pagination } = useItems({
    params: { sortBy: activePriceSort, page: currentPage },
  })

  const { setModal } = useModal()
  const navigate = useNavigate()
  const { mobile } = useMobile()

  return (
    <div className="all-items-container">
      <div className="left-panel-container">
        <SearchBar />
        <PriceFilter />
        <CategoriesFilter />
      </div>
      <div className="all-items-content-container">
        {mobile ? <MobileToolbar /> : <Toolbar />}
        <div className="item-cards-container">
          {searchValue && items.length === 0 && (
            <NoResultsPage result={searchValue} />
          )}
          {items.map((item, index) => (
            <ItemCard
              key={index}
              itemImg={item.icon}
              itemName={item.desc}
              rarity={index === 0 ? 'rare' : index === 1 ? 'special' : index === 2 ? 'legendary' : index === 3 ? 'last' : 'standard'}
              onClick={() => navigate(`/item/${item.id}`)}
            >
              <span>Starting at</span>
              <span className={'item-price'}>
                <span
                  style={{
                    fontSize: item.minPrice.length > 7 ? mobile ? '13px' : '14px' : mobile ? '14px' : '16px',
                  }}
                >
                  {item.minPrice}
                </span>
                <Icon icon="logoDarkIcon" className="price-icon" />
              </span>
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

export default AllItems

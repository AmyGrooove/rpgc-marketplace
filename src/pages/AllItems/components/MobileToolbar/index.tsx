import './index.scss'
import { useState } from 'react'

import DropdownMenu from '../../../../components/common/DropdownMenu'
import { AllItemsFilterType, useFilter } from '../../hooks/useFilter'
import MobileFilter from '../MobileFilter'
import RarityFilter from '../../../../components/RarityFilter'
import { SearchBar } from '../../../../components/common'
import MobileFilterContainer from '../../../../components/MobileFilterContainer'
import PriceFilter from '../../../../components/PriceFilter/PriceFilter'
import CategoriesFilter from '../../../../components/CategoriesFilter/CategoriesFilter'
import usePriceSort, { PriceSortType } from '../../../../hooks/usePriceSort'
import RarityFilterMobile from '../../../../components/RarityFilterMobile'
import MobileDropdown from '../../../../components/MobileDropdown'

const MobileToolbar = () => {
  const [searchVisible, setSearchVisible] = useState(false)
  const [sortVisible, setSortVisible] = useState(false)
  const [priceFilterVisible, setPriceFilterVisible] = useState(false)
  const [categoriesVisible, setCategoriesVisible] = useState(false)
  const [itemsFilterVisible, setItemsFilterVisible] = useState(false)
  const [rarityFilterVisible, setRarityFilterVisible] = useState(false)

  const {
    setPopularFilter,
    setNewFilter,
    activeFilter,
  } = useFilter()

  const {
    activePriceSort,
    setAscSort,
    setDescSort,
  } = usePriceSort()

  const buttonsData = [
    {
      name: 'Popular items',
      clickHandler: () => {
        setPopularFilter()
        setItemsFilterVisible(false)
      },
      type: AllItemsFilterType.popular,
    },
    {
      name: 'New items',
      clickHandler: () => {
        setNewFilter()
        setItemsFilterVisible(false)
      },
      type: AllItemsFilterType.new,
    },
  ]

  const dropdownMenuItems = [
    {
      name: 'High price',
      clickHandler: () => {
        setDescSort()
        setSortVisible(false)
      },
      type: PriceSortType.desc,
    },
    {
      name: 'Low price',
      clickHandler: () => {
        setAscSort()
        setSortVisible(false)
      },
      type: PriceSortType.asc,
    },
  ]

  return (
    <div className={'mobile-toolbar'}>
      <div className={'up-panel'}>
        <MobileDropdown
          name={'All categories'}
          filterVisible={categoriesVisible}
          onClick={() => setCategoriesVisible(!categoriesVisible)}
        />
        <MobileDropdown
          name={activeFilter === 'new' ? 'New items' : 'Popular items'}
          filterVisible={itemsFilterVisible}
          onClick={() => setItemsFilterVisible(!itemsFilterVisible)}
        />
        <RarityFilterMobile onClick={() => setRarityFilterVisible(true)} />
      </div>
      <div className={'bottom-panel'}>
        <MobileFilter
          icon={'searchIcon'}
          name={'Search'}
          onClick={() => setSearchVisible(true)}
        />
        <span className={'divider'} />
        <div className={'dropdown-filter'}>
          <MobileFilter
            icon={'sortIcon'}
            name={'Sort'}
            onClick={() => setSortVisible(!sortVisible)}
          />
        </div>
        <span className={'divider'} />
        <MobileFilter
          icon={'doubleCirclesIcon'}
          name={'Price'}
          onClick={() => setPriceFilterVisible(!priceFilterVisible)}
        />
      </div>
      {searchVisible && (
        <MobileFilterContainer
          onClose={() => setSearchVisible(false)}
          filterName={'Search'}
        >
          <SearchBar />
        </MobileFilterContainer>
      )}
      {priceFilterVisible && (
        <>
          <div className={'filter-backdrop'} onClick={() => setPriceFilterVisible(false)} />
          <PriceFilter closeFilter={() => setPriceFilterVisible(!priceFilterVisible)} />
        </>
      )}
      {categoriesVisible && (
        <>
          <div className={'filter-backdrop'} onClick={() => setCategoriesVisible(false)} />
          <CategoriesFilter closeFilter={() => setCategoriesVisible(!categoriesVisible)} />
        </>
      )}
      {sortVisible && (
        <MobileFilterContainer
          onClose={() => setSortVisible(false)}
          filterName={'Price Sort'}
        >
          <DropdownMenu
            dropdownMenuItems={dropdownMenuItems}
            activeMenu={activePriceSort}
          />
        </MobileFilterContainer>
      )}
      {itemsFilterVisible && (
        <MobileFilterContainer
          onClose={() => setItemsFilterVisible(false)}
          filterName={'Items'}
        >
          <DropdownMenu
            dropdownMenuItems={buttonsData}
            activeMenu={activeFilter}
          />
        </MobileFilterContainer>
      )}
      {rarityFilterVisible && (
        <MobileFilterContainer
          onClose={() => setRarityFilterVisible(false)}
          filterName={'Marks'}
          tick={true}
        >
          <RarityFilter />
        </MobileFilterContainer>
      )}
    </div>
  )
}

export default MobileToolbar

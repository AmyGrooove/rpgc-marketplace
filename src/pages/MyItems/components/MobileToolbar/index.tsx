import './index.scss'
import { useState } from 'react'

import useDropdown, { ItemsFilterType } from '../../hooks/useDropdown'
import DropdownMenu from '../../../../components/common/DropdownMenu'
import MobileFilter from '../../../AllItems/components/MobileFilter'
import MobileDropdown from '../../../../components/MobileDropdown'
import MobileFilterContainer from '../../../../components/MobileFilterContainer'
import { SearchBar } from '../../../../components/common'
import usePriceSort, { PriceSortType } from '../../../../hooks/usePriceSort'
import RarityFilterMobile from '../../../../components/RarityFilterMobile'
import RarityFilter from '../../../../components/RarityFilter'

const MobileToolbar = () => {
  const [itemsFilterVisible, setItemsFilterVisible] = useState(false)
  const [searchVisible, setSearchVisible] = useState(false)
  const [sortVisible, setSortVisible] = useState(false)
  const [rarityVisible, setRarityVisible] = useState(false)

  const {
    activeMenu,
    setAllFilter,
    setOnSaleFilter,
  } = useDropdown()

  const {
    activePriceSort,
    setAscSort,
    setDescSort,
  } = usePriceSort()

  const dropdownMenuItems = [
    {
      name: 'All items',
      clickHandler: () => {
        setAllFilter()
        setItemsFilterVisible(false)
      },
      type: ItemsFilterType.all,
    },
    {
      name: 'On sale now',
      clickHandler: () => {
        setOnSaleFilter()
        setItemsFilterVisible(false)
      },
      type: ItemsFilterType.onSale,
    },
  ]

  const priceSortMenuItems = [
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
    <div className={'mobile-toolbar-container'}>
      <div className={'top'}>
        <MobileDropdown
          name={activeMenu === 'onSale' ? 'On sale now' : 'All items'}
          filterVisible={itemsFilterVisible}
          onClick={() => setItemsFilterVisible(!itemsFilterVisible)}
        />
        <RarityFilterMobile onClick={() => setRarityVisible(!rarityVisible)} />
      </div>
      <div className={'bottom'}>
        <MobileFilter
          icon={'searchIcon'}
          name={'Search'}
          onClick={() => setSearchVisible(!searchVisible)}
        />
        <span className={'divider'} />
        <MobileFilter
          icon={'sortIcon'}
          name={'Sort'}
          onClick={() => setSortVisible(!sortVisible)}
        />
      </div>
      {itemsFilterVisible && (
        <MobileFilterContainer
          onClose={() => setItemsFilterVisible(false)}
          filterName={'Items'}
        >
          <DropdownMenu
            dropdownMenuItems={dropdownMenuItems}
            activeMenu={activeMenu}
          />
        </MobileFilterContainer>
      )}
      {searchVisible && (
        <MobileFilterContainer
          onClose={() => setSearchVisible(false)}
          filterName={'Search'}
        >
          <SearchBar />
        </MobileFilterContainer>
      )}
      {sortVisible && (
        <MobileFilterContainer
          onClose={() => setSortVisible(false)}
          filterName={'Price Sort'}
        >
          <DropdownMenu
            dropdownMenuItems={priceSortMenuItems}
            activeMenu={activePriceSort}
          />
        </MobileFilterContainer>
      )}
      {rarityVisible && (
        <MobileFilterContainer
          onClose={() => setRarityVisible(false)}
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

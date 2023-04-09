import './index.scss'

import { FilterButtons } from '../../../../components/common'
import RarityFilter from '../../../../components/RarityFilter'
import DropdownMenu from '../../../../components/common/DropdownMenu'
import usePriceSort, { PriceSortType } from '../../../../hooks/usePriceSort'
import { AllItemsFilterType, useFilter } from '../../hooks/useFilter'

const Toolbar = () => {
  const {
    activePriceSort,
    setAscSort,
    setDescSort,
  } = usePriceSort()

  const {
    setPopularFilter,
    setNewFilter,
    activeFilter,
  } = useFilter()

  const dropdownMenuItems = [
    {
      name: 'High price',
      clickHandler: () => {
        setDescSort()
      },
      type: PriceSortType.desc,
    },
    {
      name: 'Low price',
      clickHandler: () => {
        setAscSort()
      },
      type: PriceSortType.asc,
    },
  ]

  const buttonsData = [
    {
      name: 'Popular items',
      clickHandler: setPopularFilter,
      type: AllItemsFilterType.popular,
    },
    {
      name: 'New items',
      clickHandler: setNewFilter,
      type: AllItemsFilterType.new,
    },
  ]

  return (
    <div className="toolbar-container">
      <FilterButtons
        buttons={buttonsData}
        activeFilter={activeFilter}
      />
      <div className="rarity-n-price-filter-container">
        <RarityFilter />
        <DropdownMenu
          dropdownMenuItems={dropdownMenuItems}
          activeMenu={activePriceSort}
        />
      </div>
    </div>
  )
}

export default Toolbar

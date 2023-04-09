import { useState } from 'react'

import { FilterButtons } from '../../../../components/common'
import RarityFilter from '../../../../components/RarityFilter'
import DropdownMenu from '../../../../components/common/DropdownMenu'
import useDropdown, { ItemsFilterType } from '../../hooks/useDropdown'

const Toolbar = () => {
  const {
    activeMenu,
    setAllFilter,
    setOnSaleFilter,
  } = useDropdown()

  const dropdownMenuItems = [
    {
      name: 'All items',
      clickHandler: () => {
        setAllFilter()
      },
      type: ItemsFilterType.all,
    },
    {
      name: 'On sale now',
      clickHandler: () => {
        setOnSaleFilter()
      },
      type: ItemsFilterType.onSale,
    },
  ]

  const buttonsData = [
    {
      name: 'My items',
      clickHandler: () => {},
      type: '',
    },
  ]

  return (
    <div className={'toolbar-container'}>
      <FilterButtons
        buttons={buttonsData}
        activeFilter={''}
      />
      <div className={'rarity-n-price-filter-container'}>
        <RarityFilter />
        <DropdownMenu
          dropdownMenuItems={dropdownMenuItems}
          activeMenu={activeMenu}
        />
      </div>
    </div>
  )
}

export default Toolbar

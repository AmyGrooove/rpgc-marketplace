import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const itemsFilterParam = 'items'

export enum ItemsFilterType {
  all = 'all',
  onSale = 'onSale',
}

type ItemsFilterProps = {
  setAllFilter: () => void,
  setOnSaleFilter: () => void,
  activeMenu: ItemsFilterType
}

export default function useDropdown(): ItemsFilterProps {
  const [search, setSearch] = useSearchParams()
  const [activeMenu, setActiveMenu] = useState(ItemsFilterType.all)

  const setAllFilter = () => {
    search.set(itemsFilterParam, ItemsFilterType.all)
    setSearch(search, {
      replace: true,
    })
  }

  const setOnSaleFilter = () => {
    search.set(itemsFilterParam, ItemsFilterType.onSale)
    setSearch(search, {
      replace: true,
    })
  }

  useEffect(() => {
    if (search.has(itemsFilterParam)) {
      // @ts-ignore
      setActiveMenu(search.get(itemsFilterParam))
    }
  }, [search])

  return {
    setAllFilter,
    setOnSaleFilter,
    activeMenu,
  }
}

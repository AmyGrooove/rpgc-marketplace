import classNames from 'classnames'

import { OrderListFilterType, useOrdersFilter } from '../../../../hooks/useOrdersFilter'
import './index.scss'

const FilterButtons = () => {
  const {
    setSaleFilter,
    setBuyFilter,
    activeFilter,
    saleOrdersCount,
    buyOrdersCount,
  } = useOrdersFilter()

  const buttonsData = [
    {
      name: `${saleOrdersCount} Sale offers`,
      clickHandler: setSaleFilter,
      type: OrderListFilterType.sale,
    },
    {
      name: `${buyOrdersCount} Buy offers`,
      clickHandler: setBuyFilter,
      type: OrderListFilterType.buy,
    },
  ]
  
  return (
    <div className={'filter-buttons'}>
      {buttonsData.map(item =>
        <div
          onClick={item.clickHandler}
          className={classNames(
            'button',
            activeFilter === item.type && 'active',
          )}
        >
          {item.name}
        </div>,  
      )}
    </div>
  )
}

export default FilterButtons

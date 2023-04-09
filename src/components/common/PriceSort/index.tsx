import { useState } from 'react'
import classNames from 'classnames'

import { Icon } from '../'
import usePriceSort, { PriceSortType } from '../../../hooks/usePriceSort'

import './index.scss'

const PriceSort = () => {
  const { setAscSort, setDescSort, activePriceSort } = usePriceSort()
  const [popupVisible, setPopupVisible] = useState(false)
  
  const popupItems = [
    {
      name: 'Low price',
      clickHandler: () => {
        setAscSort()
        setPopupVisible(false)
      },
      type: PriceSortType.asc,
    },
    {
      name: 'High price',
      clickHandler: () => {
        setDescSort()
        setPopupVisible(false)
      },
      type: PriceSortType.desc,
    },
  ]

  // TODO переработать этот компонент через использование DropdownMenu и в местах
  //  где используется сортировка по цене использовать PriseSort вместо DropdownMenu
  return (
    <div
      className={'price-sort'}
      onMouseOver={() => setPopupVisible(true)}
      onMouseOut={() => setPopupVisible(false)}
    >
      <div className={'sort-type'}>
        <span>
          {popupItems
            .filter(item => item.type === activePriceSort)
            .map((item, index) =>
              <span key={index}>
                {item.name}
              </span>)
          }
        </span>
        <Icon icon="arrowIcon" />
      </div>

      <div
        className={classNames(
          'popup',
          popupVisible && 'visible',
        )}
      >
        <ul>
          {popupItems.map((item, index) =>
            <li
              key={index}
              onClick={item.clickHandler}
            >
              {item.name}
            </li>)
          }
        </ul>
      </div>
    </div>
  )
}

export default PriceSort

import classNames from 'classnames'

import { Icon } from '../index'
import './index.scss'
import { FilterItems } from '../../../dependencies/constants/types'

import { useState } from 'react'

interface DropdownMenuProps {
  dropdownMenuItems: FilterItems[];
  activeMenu: string;
}

const DropdownMenu = ({ dropdownMenuItems, activeMenu }: DropdownMenuProps) => {
  const [menuVisible, setMenuVisible] = useState(false)

  const activeItem = () =>
    dropdownMenuItems.filter((item) => item.type === activeMenu)

  const inactiveItems = () =>
    dropdownMenuItems.filter((item) => item.type !== activeMenu)

  return (
    <div
      className={classNames('dropdown-menu', menuVisible && 'visible')}
      onMouseOver={() => setMenuVisible(true)}
      onMouseOut={() => setMenuVisible(false)}
      onClick={() => setMenuVisible(!menuVisible)}
    >
      <div className={'sort-type'}>
        {activeItem().map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
        <Icon icon="arrowIcon" />
      </div>
      <div className={classNames('popup', menuVisible && 'visible')}>
        <ul>
          {activeItem().map((item, index) => (
            <li key={index} onClick={() => setMenuVisible(false)}>
              {item.name}
            </li>
          ))}
          {inactiveItems().map((item, index) => (
            <li
              key={index}
              onClick={() => {
                item.clickHandler()
                setMenuVisible(false)
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default DropdownMenu

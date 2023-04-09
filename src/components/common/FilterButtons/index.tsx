import './FilterButtonsStyles.scss'
import classNames from 'classnames'

import { FilterItems } from '../../../dependencies/constants/types'

interface IFilterButtons {
  buttons: FilterItems[];
  activeFilter: string;
  trades?: boolean
}

const FilterButtons = ({ buttons, activeFilter, trades }: IFilterButtons) => {
  return (
    <div className="filter-buttons-container">
      {buttons.map((el, index) => (
        <div key={index} className="filter-div">
          <button
            onClick={buttons.length === 1 ? () => {} : el.clickHandler}
            id={
              activeFilter === el.type || buttons.length === 1 ? 'active' : ''
            }
            className={classNames(
              'filter-button',
              el.name === 'Trades' && trades && 'trades',
            )}
          >
            {el.name}
            {el.name === 'Trades' && <span className={'dot'} />}
          </button>
          <div
            className="filter-border"
            id={
              activeFilter !== el.type &&
              buttons[index + 1] &&
              activeFilter !== buttons[index + 1].type &&
              index !== buttons.length - 1
                ? 'active'
                : ''
            }
          />
        </div>
      ))}
    </div>
  )
}

export default FilterButtons

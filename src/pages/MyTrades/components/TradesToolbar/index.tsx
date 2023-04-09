import { FilterButtons, Icon } from '../../../../components/common'
import {
  MyTradesFilterType,
  useMyTradesFilter,
} from '../../hooks/useMyTradesFilter'
import './index.scss'
import DropdownMenu from '../../../../components/common/DropdownMenu'
import useMyTradesDropdown, {
  TradesDropdownType,
} from '../../hooks/useMyTradesDropdown'

import { useSearchParams } from 'react-router-dom'
import Calendar from 'react-calendar'

import MobileFilter from '../../../AllItems/components/MobileFilter'
import useMobile from '../../../../hooks/useMobile'
import MobileFilterContainer from '../../../../components/MobileFilterContainer'

import { useState } from 'react'
import classNames from 'classnames'

import useCalendar from '../../hooks/useCalendar'

const TradesToolbar = () => {
  const [search] = useSearchParams()
  const history = search.get('myTrades') === 'history'
  const { mobile } = useMobile()
  const [sortVisible, setSortVisible] = useState(false)
  const [calendarVisible, setCalendarVisible] = useState(false)
  const { date, setDateFilter } = useCalendar()

  const {
    setTradesFilter,
    setHistoryFilter,
    setOffersFilter,
    activeFilter,
  } = useMyTradesFilter()

  const {
    activeMenu,
    setAllTransactions,
    setBuyTransactions,
    setSellTransactions,
    setExchangeTransactions,
  } = useMyTradesDropdown()

  const buttonsData = [
    {
      name: 'Trades',
      clickHandler: setTradesFilter,
      type: MyTradesFilterType.trades,
    },
    {
      name: 'My Offers',
      clickHandler: setOffersFilter,
      type: MyTradesFilterType.offers,
    },
    {
      name: 'History',
      clickHandler: setHistoryFilter,
      type: MyTradesFilterType.history,
    },
  ]

  const dropdownMenuItems = [
    {
      name: 'All transactions',
      clickHandler: () => {
        setAllTransactions()
        setSortVisible(false)
      },
      type: TradesDropdownType.all,
    },
    {
      name: 'Buy',
      clickHandler: () => {
        setBuyTransactions()
        setSortVisible(false)
      },
      type: TradesDropdownType.buy,
    },
    {
      name: 'Sell',
      clickHandler: () => {
        setSellTransactions()
        setSortVisible(false)
      },
      type: TradesDropdownType.sell,
    },
    {
      name: 'Exchange',
      clickHandler: () => {
        setExchangeTransactions()
        setSortVisible(false)
      },
      type: TradesDropdownType.exchange,
    },
  ]

  return (
    <div
      className={classNames(
        'my-trades-toolbar-container',
        history && 'history-container',
      )}
    >
      <FilterButtons
        buttons={buttonsData}
        activeFilter={activeFilter}
        trades={true}
      />
      <div className={history ? 'dropdown-menus' : 'dropdown'}>
        {history && (
          <>
            {mobile ? (
              <>
                <MobileFilter
                  icon={'sortIcon'}
                  name={'Date'}
                  onClick={() => setCalendarVisible(!calendarVisible)}
                />
                <span className={'divider'} />
                {calendarVisible && (
                  <MobileFilterContainer
                    onClose={() => setCalendarVisible(false)}
                    filterName={'Specific date'}
                  >
                    <Calendar
                      locale={'en-US'}
                      onChange={(data: any) => setDateFilter(data)}
                      nextLabel={<Icon icon={'calendarNextIcon'} />}
                      prevLabel={<Icon icon={'calendarPrevIcon'} />}
                      selectRange={true}
                      value={date}
                    />
                  </MobileFilterContainer>
                )}
              </>
            ) : (
              <div
                className={classNames(
                  'date-dropdown-container',
                  calendarVisible && 'visible',
                )}
                onMouseOver={() => setCalendarVisible(true)}
                onMouseOut={() => setCalendarVisible(false)}
              >
                <div className={'title'}>
                  All time
                  <Icon icon="arrowIcon" className={'down-arrow'} />
                </div>
                {calendarVisible && (
                  <Calendar
                    locale={'en-US'}
                    onChange={(data: any) => setDateFilter(data)}
                    nextLabel={<Icon icon={'calendarNextIcon'} />}
                    prevLabel={<Icon icon={'calendarPrevIcon'} />}
                    selectRange={true}
                    value={date}
                  />
                )}
              </div>
            )}
          </>
        )}
        {mobile ? (
          <MobileFilter
            icon={'sortIcon'}
            name={'Sort'}
            onClick={() => setSortVisible(!sortVisible)}
          />
        ) : (
          <DropdownMenu
            dropdownMenuItems={dropdownMenuItems}
            activeMenu={activeMenu}
          />
        )}
        {sortVisible && (
          <MobileFilterContainer
            onClose={() => setSortVisible(false)}
            filterName={'Transaction type'}
          >
            <DropdownMenu
              dropdownMenuItems={dropdownMenuItems}
              activeMenu={activeMenu}
            />
          </MobileFilterContainer>
        )}
      </div>
    </div>
  )
}

export default TradesToolbar

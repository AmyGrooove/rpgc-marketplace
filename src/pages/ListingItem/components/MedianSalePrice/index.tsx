import { GRAY_ARROW } from '../../../../theme/sources'
import FilterButtons from '../../../../components/common/FilterButtons'

import MedianBlock from './MedianBlock'

import './MedianSalePriceStyles.scss'
import { GraphFilterType, useGraphFilter } from '../../hooks/useGraphFilter'

import { useNavigate } from 'react-router-dom'

const MedianSalePrice = () => {
  const navigate = useNavigate()

  const {
    setAllTimeFilter,
    setYearFilter,
    setWeekFilter,
    setMonthFilter,
    activeFilter,
  } = useGraphFilter()

  const buttonsData = [
    {
      name: 'All time',
      clickHandler: setAllTimeFilter,
      type: GraphFilterType.allTime,
    },
    {
      name: 'Year',
      clickHandler: setYearFilter,
      type: GraphFilterType.year,
    },
    {
      name: 'Month',
      clickHandler: setMonthFilter,
      type: GraphFilterType.month,
    },
    {
      name: 'Week',
      clickHandler: setWeekFilter,
      type: GraphFilterType.week,
    },
  ]

  return (
    <>
      <div className="median-container">
        <div className="median-header">
          <div className="left-pannel">
            <button className="left-button" onClick={() => navigate(-1)}>
              <img src={GRAY_ARROW} alt="" />
            </button>
            <div className="left-text">Median Sale Price</div>
          </div>
          <FilterButtons
            buttons={buttonsData}
            activeFilter={activeFilter}
          />
        </div>
        <div className="median-block">
          <MedianBlock />
        </div>
      </div>
    </>
  )
}

export default MedianSalePrice

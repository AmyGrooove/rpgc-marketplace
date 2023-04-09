import { getTrackBackground, Range } from 'react-range'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { debounce } from 'lodash'
import './PriceFilterStyles.scss'

import { Icon } from '../common'
import useMobile from '../../hooks/useMobile'

interface PriceFilterProps {
  closeFilter?: () => void
}

const PriceFilter = ({ closeFilter }: PriceFilterProps) => {
  const [search, setSearch] = useSearchParams()
  const defaultValues = search.get('filter.minPrice')?.slice(5).split(',') ?? ['0', '160']
  const [values, setValues] = useState(
    [parseFloat(defaultValues[0]), parseFloat(defaultValues[1])],
  )
  const [priceFilterActive, setPriceFilterActive] = useState(false)
  const { mobile } = useMobile()

  const filterDeleteHandler = () => {
    setValues([0, 160])
    setPriceFilterActive(false)
    search.set('filter.minPrice', '$btw:0,160')
    setSearch(search, {
      replace: true,
    })
  }

  const onRangeChangeHandler = debounce((range: number[]) => {
    search.set('filter.minPrice', `$btw:${range[0]},${range[1]}`)
    setPriceFilterActive(true)
    setSearch(search, {
      replace: true,
    })
  }, 500)

  return (
    <div className="price-filter-container">
      <div className="price-filter-title">
        Price
        {priceFilterActive && !mobile &&
          <Icon
            onClick={filterDeleteHandler}
            icon={'redCircleWhiteCrossIcon'}
            className={'red-circle'}
          />}
        {mobile && (
          <div className={'close-actions'}>
            <Icon
              icon={'tickIcon'}
              className={'tick'}
              onClick={closeFilter ? closeFilter : () => {}}
            />
            <Icon
              icon={'greyCross'}
              className={'cross'}
              onClick={closeFilter ? closeFilter : () => {}}
            />
          </div>
        )}
      </div>
      <div className="price-range-container">
        <Range
          step={0.0001}
          min={0}
          max={160}
          values={values}
          onChange={(value) => {
            onRangeChangeHandler(value)
            setValues(value)
          }}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                height: '3px',
                borderRadius: '10px',
                background: getTrackBackground({
                  values: values,
                  colors: ['#332D43', '#D0383F', '#332D43'],
                  min: 0,
                  max: 160,
                }),
                alignSelf: 'center',
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div {...props} className="price-thumb" />
          )}
        />
      </div>
      <div className="price-container">
        <span>{values[0]}</span>
        <span>{values[1]}</span>
      </div>
    </div>
  )
}

export default PriceFilter

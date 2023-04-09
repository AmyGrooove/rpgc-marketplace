import {OrderListFilterType} from '../../../../ListingItem/hooks/useOrdersFilter'

import './index.scss'
import Moment from 'react-moment'
import { useSearchParams } from 'react-router-dom'

type Props = {
  type: OrderListFilterType
  date: string
  exchange?: boolean
}

const TypeAndDate = ({
  type,
  date,
  exchange,
}: Props) => {
  // const getOrderTypeName = () => type[0].toUpperCase() + type.slice(1) + (exchange ? ' + Exchange' : '')
  const [search] = useSearchParams()
  const history = search.get('myTrades') === 'history'

  return (
    <div className={'type-and-date'}>
      <div className={'type'}>
        <span>
          {type}
        </span>
      </div>

      <span className={'separator'}>
        &nbsp;{'•'}&nbsp;
      </span>

      <div className={'date'}>
        {history ? (
          <Moment format={'D MMM YYYY, HH:MM'} withTitle>
            {date}
          </Moment>
        ) : (
          <Moment fromNow>
            {date}
          </Moment>
        )}
      </div>
    </div>
  )
}

export default TypeAndDate
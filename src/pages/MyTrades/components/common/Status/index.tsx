import './index.scss'
import { orderStatusTypes } from '../../TradesList/tempList'

type Props = {
  status: number
}

const Status = ({status}: Props) => {
  const getOrderTypeName = () => orderStatusTypes[status][0].toUpperCase() + orderStatusTypes[status].slice(1)

  return (
    <div className={'trades-status'}>
      <div>
        {getOrderTypeName()}
      </div>
    </div>
  )
}

export default Status

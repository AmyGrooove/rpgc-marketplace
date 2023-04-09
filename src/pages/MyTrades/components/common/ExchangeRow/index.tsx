import './index.scss'
import { Icon } from '../../../../../components/common'
import { orderStatusTypes } from '../../TradesList/tempList'
import MemberInfo from '../MemberInfo'
import TypeAndDate from '../TypeAndDate'
import Status from '../Status'
import useMobile from '../../../../../hooks/useMobile'

import ExchangeRowActions from './Actions'
import OfferInfo from './OfferInfo'

type Props = {
  orderData: any;
};

const ExchangeRow = ({ orderData }: Props) => {
  const statusRejected = orderData.status === orderStatusTypes.rejected
  const statusCompleted = orderData.status === orderStatusTypes.completed
  const statusPending = orderData.status === orderStatusTypes.pending
  const { mobile } = useMobile()

  return (
    <>
      <div className={'left'}>
        <OfferInfo
          myOffer={orderData.myOffer}
          memberOffer={orderData.memberOffer}
          memberIcon={orderData.orderMember.icon}
          memberName={orderData.orderMember.name}
        />
      </div>
      <div className={'right'}>
        <div className={'type-n-date'}>
          {mobile && <Icon icon={'exchange'} />}
          <TypeAndDate type={orderData.type} date={orderData.date} />
        </div>

        {(statusRejected || statusCompleted) && (
          <Status status={orderData.status} />
        )}

        {statusPending && (
          <ExchangeRowActions offerInitiator={orderData.offerInitiator} />
        )}

        {!mobile && (
          <MemberInfo
            icon={orderData.orderMember.icon}
            name={orderData.orderMember.name}
          />
        )}
      </div>
    </>
  )
}

export default ExchangeRow

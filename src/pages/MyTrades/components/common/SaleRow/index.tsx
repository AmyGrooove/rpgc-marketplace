import MemberInfo from '../MemberInfo'
import Status from '../Status'
import TypeAndDate from '../TypeAndDate'

import OrderInfo from './OrderInfo'

import './index.scss'
import useMobile from '../../../../../hooks/useMobile'
import { Icon } from '../../../../../components/common'

type Props = {
  orderData: any
}

const SaleRow = ({ orderData }: Props) => {
  const { mobile } = useMobile()

  return (
    <>
      <div className={'left'}>
        <OrderInfo
          price={orderData.memberOffer.price}
          item={orderData.myOffer.items[0]}
          memberIcon={orderData.orderMember.icon}
          memberName={orderData.orderMember.name}
        />
      </div>
      <div className={'right'}>
        <div className={'type-n-date'}>
          {mobile && <Icon icon={'sale'} />}
          <TypeAndDate
            type={orderData.type}
            date={orderData.date}
          />
        </div>

        <Status status={orderData.status} />

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

export default SaleRow
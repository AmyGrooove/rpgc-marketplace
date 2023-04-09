import { Icon } from '../../../../../../components/common'
import RpgcValue from '../../../../../../components/common/RpgcValue'
import ItemInfo from '../../ItemInfo'
import './index.scss'
import useMobile from '../../../../../../hooks/useMobile'
import MemberInfo from '../../MemberInfo'

type Props = {
  price: string
  item: {
    icon: string
    name: string
  }
  memberIcon: string
  memberName: string
}

const OfferInfo = ({
  price,
  item,
  memberIcon,
  memberName,
}: Props) => {
  const { mobile } = useMobile()

  return (
    <div className={'buy-offer-info'}>
      {mobile && <span className={'purchase-item'}>Purchase Amount</span>}
      <RpgcValue value={price} />

      <Icon icon={'buy'} />

      {mobile && (
        <div className={'purchase-info'}>
          <span className={'purchase-item'}>Item You Buy</span>
          <MemberInfo icon={memberIcon} name={memberName} />
        </div>
      )}
      <ItemInfo icon={item.icon} name={item.name} />
    </div>
  )
}

export default OfferInfo

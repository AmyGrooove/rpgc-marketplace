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
    <div className={'sale-offer-info'}>
      {mobile && <span className={'sale-item'}>Item for Sale</span>}
      <ItemInfo icon={item.icon} name={item.name} />

      <Icon icon={'sale'} />

      {mobile && (
        <div className={'sale-info'}>
          <span className={'sale-amount'}>Sale Amount</span>
          <MemberInfo icon={memberIcon} name={memberName} />
        </div>
      )}
      <RpgcValue value={price} />
    </div>
  )
}

export default OfferInfo
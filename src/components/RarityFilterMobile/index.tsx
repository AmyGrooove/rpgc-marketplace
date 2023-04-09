import './index.scss'
import {
  LASTONEARTH_ICON,
  LEGENDARY_ICON,
  RARE_ICON,
  SPECIAL_ICON,
} from '../../theme/sources'

interface RarityFilterMobileProps {
  onClick: () => void
}

const RarityFilterMobile = ({ onClick }: RarityFilterMobileProps) => {
  return (
    <div
      className={'rarity'}
      onClick={onClick}
    >
      <img src={RARE_ICON} alt={''} />
      <img src={SPECIAL_ICON} alt={''} />
      <img src={LEGENDARY_ICON} alt={''} />
      <img src={LASTONEARTH_ICON} alt={''} />
    </div>
  )
}

export default RarityFilterMobile

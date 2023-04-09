import { Icon } from '../../../../components/common'
import './index.scss'

interface MobileFilterProps {
  icon: string
  name: string
  onClick: () => void
}

const MobileFilter = ({
  icon,
  name,
  onClick,
}: MobileFilterProps) => {
  return (
    <div className={'mobile-filter'} onClick={onClick}>
      <Icon icon={icon} />
      <span>{name}</span>
    </div>
  )
}

export default MobileFilter

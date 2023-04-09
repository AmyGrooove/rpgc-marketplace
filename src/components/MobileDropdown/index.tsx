import classNames from 'classnames'

import { Icon } from '../common'
import './index.scss'

interface IMobileDropdown {
  name: string
  filterVisible: boolean
  onClick: () => void
}

const MobileDropdown = ({
  name,
  filterVisible,
  onClick,
}: IMobileDropdown) => {
  return (
    <div
      className={classNames(
        'categories-filter',
        filterVisible && 'visible',
      )}
      onClick={onClick}
    >
      {name}
      <Icon icon="arrowIcon" />
    </div>
  )
}

export default MobileDropdown

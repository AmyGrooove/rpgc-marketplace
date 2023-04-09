import { Icon } from '../common'
import './index.scss'

interface MobileFilterContainerProps {
  children: any
  onClose: () => void
  filterName: string
  tick?: boolean
}

const MobileFilterContainer = ({
  children,
  onClose,
  filterName,
  tick,
}: MobileFilterContainerProps) => {
  return (
    <>
      <div className={'filter-backdrop'} onClick={onClose} />
      <div className={'filter-container'}>
        <div className={'filter-header'}>
          <span>{filterName}</span>
          <div className={'close-actions'}>
            {tick && <Icon
              icon={'tickIcon'} onClick={onClose}
              className={'tick'} />}
            <Icon
              icon={'greyCross'} onClick={onClose}
              className={'cross'} />
          </div>
        </div>
        {children}
      </div>
    </>
  )
}

export default MobileFilterContainer

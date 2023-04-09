import './index.scss'
import { Icon } from '../../../../components/common'

const NoItemsPage = () => {
  return (
    <div className={'no-items-container'}>
      <div className={'content'}>
        <Icon icon="sadSmileyIcon" />
        <span>
          You don't have any items
        </span>
      </div>
    </div>
  )
}

export default NoItemsPage

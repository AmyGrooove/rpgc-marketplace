import './index.scss'
import { Icon } from '../../../common'
import RPGCValueLight from '../../../RPGCValueLight'

interface ClaimNotificationProps {
  value: string
}

const ClaimNotification = ({ value }: ClaimNotificationProps) => {
  return (
    <div className={'claim-notification'}>
      <Icon icon={'doubleCirclesIcon'} className={'circles'} />
      <div className={'reward-info'}>
        <RPGCValueLight value={value} />
        Reward for sale
      </div>
      <div className={'claim-btn'}>
        Claim
      </div>
    </div>
  )
}

export default ClaimNotification

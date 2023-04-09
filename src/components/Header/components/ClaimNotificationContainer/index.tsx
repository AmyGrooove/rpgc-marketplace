import './index.scss'
import { Icon } from '../../../common'
import ModalContainer from '../ModalContainer'
import ClaimNotification from '../ClaimNotification'

interface ClaimNotificationContainerProps {
  close: () => void
  value: string
  visible: boolean
}

const ClaimNotificationContainer = ({ close, value, visible }: ClaimNotificationContainerProps) => {
  return (
    <ModalContainer visible={visible}>
      <div className={'claim-notification-container'}>
        <Icon
          icon={'greyCross'}
          className={'grey-cross'}
          onClick={close}
        />
        <ClaimNotification
          value={value}
        />
      </div>
    </ModalContainer>
  )
}

export default ClaimNotificationContainer

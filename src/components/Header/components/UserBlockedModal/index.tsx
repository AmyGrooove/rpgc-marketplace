import './index.scss'
import ModalContainer from '../ModalContainer'
import { Icon } from '../../../common'
import LogoutButton from '../../../LogoutButton'

interface UserBlockedModalProps {
  logout: () => void
  modalVisible: boolean
}

const UserBlockedModal = ({ logout, modalVisible }: UserBlockedModalProps) => {
  return (
    <ModalContainer blocked={true} visible={modalVisible}>
      <div className={'user-blocked-content'}>
        <div className={'user-blocked-header'}>
          <Icon icon={'blockedAccountIcon'} />
          Your Account is Blocked
          <LogoutButton logoutFunction={logout} />
        </div>
        <div className={'user-blocked-description'}>
          We were forced to temporarily block your account. Please contact customer support.
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
          >
            Support Service
          </a>
        </div>
      </div>
    </ModalContainer>
  )
}

export default UserBlockedModal

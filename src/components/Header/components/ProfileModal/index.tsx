import { Icon } from '../../../common'
import './index.scss'
import { shortAddress } from '../../../../dependencies/helper/helperFunctions'
import ToggleButton from '../../../ToggleButton'
import { AmplifyStore, MfaStore, Web3Store } from '../../../../stores'
import useMobile from '../../../../hooks/useMobile'
import ModalContainer from '../ModalContainer'
import LogoutButton from '../../../LogoutButton'
import RPGCValueLight from '../../../RPGCValueLight'

import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import GAuthModal from '../GAuthModal'
import useModal from '../../../Modals/ModalProvider/useModal'
import ModalOverlay from '../../../Modals/ModalOverlay'
import { getAvatar } from '../../../../dependencies/helper/getAvatar'

interface ProfileModalProps {
  logout: () => void;
  username: string;
  email: string;
  balance: string;
  setProfileVisible: () => void;
  connectWallet: () => void;
  modalVisible: boolean;
}

const ProfileModal = observer(
  ({
    logout,
    username,
    email,
    balance,
    setProfileVisible,
    connectWallet,
    modalVisible,
  }: ProfileModalProps) => {
    const { isConnected, account, disconnect } = Web3Store
    const { mobile } = useMobile()
    const { check2fa, mfaEnable } = MfaStore
    const { setModal } = useModal()
    const { user } = AmplifyStore

    useEffect(() => {
      check2fa()
    }, [])

    return (
      <ModalContainer visible={modalVisible}>
        <div className={'content-container'}>
          <div className={'block-header'}>
            {mobile && (
              <>
                <span>My Profile</span>
                <Icon icon={'greyCloseBtn'} onClick={setProfileVisible} />
              </>
            )}
          </div>
          <div className={'profile'}>
            <img src={getAvatar(user.id)} alt="" />
            <div className={'refresh-icon'}>
              <Icon icon="refreshIcon" />
            </div>
            <div className={'profile-data'}>
              <div className={'profile-name'}>{username}</div>
              <div className={'profile-email'}>{email}</div>
              <LogoutButton logoutFunction={logout} />
            </div>
          </div>

          <div className={'actions'}>
            <div className="wallet">
              <div>
                <span>Google Authenticator</span>
              </div>
              <ToggleButton
                value={mfaEnable.isGoogleEnabled}
                onChange={() =>
                  setModal(
                    <ModalOverlay>
                      <GAuthModal />
                    </ModalOverlay>,
                  )
                }
              />
            </div>
            {isConnected && (
              <>
                <div className={'horizontal-divider'} />
                <div className={'wallet'}>
                  <div>
                    <span>Wallet</span>
                    <Icon icon={'connectIcon'} />
                    <span>{shortAddress(account)}</span>
                  </div>
                  <ToggleButton
                    value={isConnected}
                    onChange={() => disconnect()}
                  />
                </div>
                {mobile &&
                  (isConnected ? (
                    <>
                      <div className={'horizontal-divider'} />
                      <div className={'wallet-actions'}>
                        <div className={'balance'}>
                          Balance
                          <RPGCValueLight value={balance} />
                        </div>
                        <a
                          target="_blank"
                          href="https://account.rpgc.io/"
                          rel="noreferrer"
                          className={'red-btn'}
                        >
                          Buy RPGC
                        </a>
                      </div>
                    </>
                  ) : (
                    <div className={'wallet-actions'}>
                      <Icon icon={'connectIcon'} />
                      Wallet not connected
                      <div className={'red-btn'} onClick={connectWallet}>
                        Connect
                      </div>
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
      </ModalContainer>
    )
  },
)

export default ProfileModal

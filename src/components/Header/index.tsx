import { useCallback, useEffect, useState } from 'react'

import { RPGC_LOGO, MINI_RPGC_LOGO, SIGN_IN } from '../../theme/sources'

import './HeaderStyles.scss'
import { observer } from 'mobx-react'

import { AmplifyStore, Web3Store } from '../../stores'
import useModal from '../Modals/ModalProvider/useModal'
import ModalOverlay from '../Modals/ModalOverlay'
import Web3Modal from '../Modals/Web3Modal'
import RpgcValue from '../common/RpgcValue'
import { Icon } from '../common'
import useMobile from '../../hooks/useMobile'
import { getAvatar } from '../../dependencies/helper/getAvatar'

import useHeader from './hooks/useHeader'

import classNames from 'classnames'
import { NavLink } from 'react-router-dom'

import ProfileModal from './components/ProfileModal'
import SignInForm from './components/SignInForm'
import UserBlockedModal from './components/UserBlockedModal'
import ClaimNotificationContainer from './components/ClaimNotificationContainer'
import useClaim from './hooks/useClaim'

const Header = observer(() => {
  const [modalVisible, setModalVisible] = useState(false)
  const [profileVisible, setProfileVisible] = useState(false)
  const [signedIn, setSignedIn] = useState(false)
  const [blocked, setBlocked] = useState(false)
  const [claim, setClaim] = useState('2 460.5032')
  const [claimModalVisible, setClaimModalVisible] = useState(false)
  const [claimNotificationVisible, setClaimNotificationVisible] =
    useState<boolean>(!!claim)
  const [menuVisible, setMenuVisible] = useState(false)
  const { navItems, balance, notification } = useHeader()
  const { setModal } = useModal()
  const { isConnected } = Web3Store
  const { mobile } = useMobile()
  const { user } = AmplifyStore

  const modalCallHandler = () => {
    if (!modalVisible) {
      setModalVisible(true)
      setProfileVisible(true)
      setClaimNotificationVisible(false)
    } else {
      setProfileVisible(false)
      setTimeout(() => {
        setModalVisible(false)
      }, 200)
    }
  }

  const claimNotificationCallHandler = () => {
    if (!claimNotificationVisible) {
      setClaimModalVisible(true)
      setClaimNotificationVisible(true)
      setProfileVisible(false)
    } else {
      setClaimNotificationVisible(false)
      setTimeout(() => {
        setClaimModalVisible(false)
      }, 200)
    }
  }

  const logoutHandler = async () => {
    try {
      await AmplifyStore.logOut()
      setSignedIn(false)
      setModalVisible(false)
      setProfileVisible(false)
    } catch (error) {
      console.log(error)
    }
  }

  const menuClickHandler = useCallback(() => {
    // @ts-ignore
    const checkbox: HTMLInputElement = document.getElementById('checkbox')

    if (checkbox.checked) {
      setMenuVisible(false)
      checkbox.checked = false
    } else {
      setMenuVisible(true)
      checkbox.checked = true
    }
  }, [])

  useEffect(() => {
    const localClaim = localStorage.getItem('claimNotificationVisible')

    if (!localClaim && claim) {
      setTimeout(() => {
        claimNotificationCallHandler()
        localStorage.setItem('claimNotificationVisible', JSON.stringify(false))
      }, 10000)
    } else {
      const stringClaim = JSON.parse(localClaim!)
      setClaimNotificationVisible(!!stringClaim)
    }
  }, [])

  useEffect(() => {
    AmplifyStore.checkUserSession().then(() => {
      if (AmplifyStore.user) {
        setSignedIn(true)
      }
    })
  }, [])

  return (
    <div className="header-back">
      <div className="header-container">
        <div className="nav-pannel">
          {mobile && (
            <div
              className="menu-icon"
              onClick={() => setMenuVisible(!menuVisible)}
            >
              <input
                id="checkbox"
                className="menu-icon__cheeckbox"
                type="checkbox"
              />
              <div>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <NavLink className="header-logo" to="/">
            <img src={RPGC_LOGO} alt="" />
            <div className="text">Marketplace</div>
          </NavLink>
          <div
            className="header-links"
            onClick={mobile ? menuClickHandler : () => {}}
          >
            {navItems.map((el, index) => (
              <NavLink
                key={index}
                to={el.url}
                className={(navData) =>
                  navData.isActive
                    ? 'nav-button active'
                    : menuVisible
                      ? 'nav-button visible'
                      : 'nav-button'
                }
              >
                {el.name}
                {el.notification &&
                  !window.location.href.includes(el.url) &&
                  !mobile && <div className="notification">{notification}</div>}
              </NavLink>
            ))}
          </div>
        </div>
        <div className={classNames('connect-pannel', menuVisible && 'hidden')}>
          {signedIn && (
            <div className="web3-block">
              {isConnected ? (
                <>
                  <RpgcValue value={balance} />

                  <a
                    className="buy-button"
                    target="_blank"
                    href="https://account.rpgc.io/"
                    rel="noreferrer"
                  >
                    Buy RPGC
                  </a>
                  {claim && (
                    <>
                      {/*TODO доработать отображение уведомления о клейме как будет готов бэк*/}
                      <div onClick={claimNotificationCallHandler}>
                        <Icon icon={'bellIcon'} className={'bell'} />
                        <div className={'notification-dot'} />
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div
                  className="connect-button"
                  onClick={() =>
                    setModal(
                      <ModalOverlay
                        disableOverlayBack
                        modalSX="connect-profile"
                      >
                        <Web3Modal />
                      </ModalOverlay>,
                    )
                  }
                >
                  <img src={MINI_RPGC_LOGO} alt="" />
                  <div className="text">Connect wallet</div>
                </div>
              )}
            </div>
          )}
          <div
            className={classNames('account-block', profileVisible && 'visible')}
            onClick={modalCallHandler}
          >
            <img
              id="avatar"
              src={signedIn ? getAvatar(user.id) : SIGN_IN}
              alt=""
            />
            <div className={signedIn ? 'name' : 'sign-in'}>
              {signedIn ? AmplifyStore.user.account : 'Sign in'}
            </div>
            <Icon id={'arrow'} icon="arrowIcon" />
          </div>
          {profileVisible && (
            <div
              className={classNames('backdrop', blocked && 'blocked')}
              onClick={() => modalCallHandler()}
            />
          )}
          {modalVisible &&
            (signedIn ? (
              blocked ? (
                <UserBlockedModal
                  logout={logoutHandler}
                  modalVisible={blocked}
                />
              ) : (
                <ProfileModal
                  logout={logoutHandler}
                  username={AmplifyStore.user.account}
                  email={AmplifyStore.user.email}
                  balance={balance}
                  modalVisible={profileVisible}
                  setProfileVisible={modalCallHandler}
                  connectWallet={() =>
                    setModal(
                      <ModalOverlay>
                        <Web3Modal />
                      </ModalOverlay>,
                    )
                  }
                />
              )
            ) : (
              <SignInForm
                setSignedIn={setSignedIn}
                setFormVisible={modalCallHandler}
                formVisible={profileVisible}
              />
            ))}
          {claimModalVisible && (
            <ClaimNotificationContainer
              value={claim}
              close={claimNotificationCallHandler}
              visible={claimNotificationVisible}
            />
          )}
        </div>
      </div>
    </div>
  )
})

export default Header

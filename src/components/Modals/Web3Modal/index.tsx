import { observer } from 'mobx-react-lite'

import { METAMASK_ICON, WALLETCONNECT_ICON } from '../../../theme/sources'
import useModal from '../ModalProvider/useModal'

import './Web3ModalStyles.scss'
import { Web3Store } from '../../../stores'
import { Icon } from '../../common'
import useMobile from '../../../hooks/useMobile'

const Web3Modal = observer(() => {
  const { setModal } = useModal()
  const { mobile } = useMobile()
  const { connect } = Web3Store

  return (
    <div className="container">
      <div className="main-text-block">
        <div className="connect-title-block">
          <div className="connect-title">Connect Wallet</div>
          {mobile && (
            <div className="greyIcon">
              <Icon icon="greyCloseBtn" onClick={() => setModal(null)} />
            </div>
          )}
        </div>
        <div className="connect-desc">
          You need to connect your crypto wallet, It's absolutely safe.
        </div>
      </div>
      <div className="connect-buttons">
        <button
          id="metamask"
          className="connect-button"
          onClick={() => connect('METAMASK').then(() => setModal(null))}
        >
          <img src={METAMASK_ICON} alt="" />
          <div className="text">MetaMask</div>
        </button>
        <button
          className="connect-button"
          onClick={() => connect('WALLETCONNECT').then(() => setModal(null))}
        >
          <img src={WALLETCONNECT_ICON} alt="" />
          <div className="text">WalletConnect</div>
        </button>
      </div>
    </div>
  )
})

export default Web3Modal

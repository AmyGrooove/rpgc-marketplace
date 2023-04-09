import useMobile from '../../../../../hooks/useMobile'
import CancelButton from '../../components/CancelButton'

import ConnectButton from './ConnectButton'
import './ConnectWalletStyles.scss'

const ConnectWallet = () => {
  const { mobile } = useMobile()

  return (
    <>
      <div className="connect-block">
        <div className="title-text">Connect Wallet</div>
        <div
          className="mini-title-text1"
          style={
            mobile
              ? { paddingTop: '0px', paddingBottom: '20px' }
              : { maxWidth: '328px' }
          }
        >
          You need to connect your crypto wallet, It's absolutely safe.
        </div>
        <div className="connect-buttons">
          <ConnectButton wallet="MetaMask" />
          <ConnectButton wallet="WalletConnect" />
        </div>
      </div>
      <div className="buttons">
        <CancelButton />
      </div>
    </>
  )
}

export default ConnectWallet

import {
  METAMASK_ICON,
  WALLETCONNECT_ICON,
} from '../../../../../theme/sources'
import { Web3Store } from '../../../../../stores'
import { IConnectButton } from '../../components/interfaces'

const ConnectButton = ({ wallet }: IConnectButton) => {
  const { connect } = Web3Store

  return (
    <div
      id={wallet === 'MetaMask' ? 'metamask' : ''}
      className="connect-button"
      onClick={() => connect(wallet.toUpperCase())}
    >
      <img
        src={wallet === 'MetaMask' ? METAMASK_ICON : WALLETCONNECT_ICON}
        alt={wallet}
      />
      <div className="connect-text">{wallet}</div>
    </div>
  )
}

export default ConnectButton

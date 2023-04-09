import { I2FA } from '../../interfaces'

import '../ConfirmStyle.scss'

import useConfirmation from '../../../hooks/useConfirmation'

import TotpInfo from './TotpInfo'
import TotpMain from './TotpMain'

const TOTPModal = ({ closeModal }: I2FA) => {
  const { openInfo, setOpenInfo } = useConfirmation()

  return (
    <>
      <div className="overlay" onClick={() => closeModal()} />
      <div className="modal modal-mobile">
        <div className="auth-block">
          {openInfo ? (
            <TotpInfo
              closeModal={closeModal}
              dopFunc={() => setOpenInfo(false)}
            />
          ) : (
            <TotpMain
              closeModal={closeModal}
              dopFunc={() => setOpenInfo(true)}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default TOTPModal

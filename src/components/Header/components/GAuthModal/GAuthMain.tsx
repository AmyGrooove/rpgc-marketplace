import { observer } from 'mobx-react-lite'
import QRCode from 'qrcode.react'
import OtpInput from 'react-otp-input'

import { MfaStore } from '../../../../stores'
import { SUMBIT_PLUS } from '../../../../theme/sources'
import useModal from '../../../Modals/ModalProvider/useModal'
import useGA from '../../hooks/useGA'

import { IGAuthModal } from '.'

const GAuthMain = observer(({ dopFunc }: IGAuthModal) => {
  const { code, setCode, wrongCode, token } = useGA()
  const { mfaEnable } = MfaStore
  const { setModal } = useModal()

  return (
    <>
      <div className="auth-title">
        <div>{mfaEnable.isGoogleEnabled ? 'Disable' : 'Enable'} 2-FA</div>
        <img
          src={SUMBIT_PLUS} alt=""
          onClick={() => setModal(null)} />
      </div>
      {!mfaEnable.isGoogleEnabled && (
        <div className="center-block">
          <QRCode
            value={'otpauth://totp/RPGC Marketplace?secret=' + token}
            renderAs="canvas"
            size={200}
          />
          <div>{token}</div>
        </div>
      )}
      <div className={`mfa-input-field ${wrongCode && 'wrong'}`}>
        <OtpInput
          value={code}
          onChange={(event: any) => setCode(event)}
          numInputs={6}
          isInputNum={true}
          separator={<span style={{ width: '16px' }} />}
        />
        {wrongCode && <div className="wrong-code">Wrong code</div>}
        <div className="code-text">
          Scan QR or enter secret key and get confirmation code using the mobile
          app.
        </div>
      </div>
      <button
        className="info-button"
        onClick={dopFunc ? () => dopFunc() : () => {}}
      >
        How it work?
      </button>
    </>
  )
})

export default GAuthMain

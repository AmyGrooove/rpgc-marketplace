import QRCode from 'qrcode.react'
import OtpInput from 'react-otp-input'

import { SUMBIT_PLUS } from '../../../../../../theme/sources'
import { I2FA } from '../../interfaces'
import useConfirmation from '../../../hooks/useConfirmation'
import useGetSecret from '../../../../../../hooks/useGetSecret'

const TotpMain = ({ closeModal, dopFunc }: I2FA) => {
  const { code, setCode, wrongCode } = useConfirmation()
  const { token } = useGetSecret()

  return (
    <>
      <div className="auth-title">
        <div>2-FA Confirmation</div>
        <img
          src={SUMBIT_PLUS} alt=""
          onClick={() => closeModal()} />
      </div>
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
}

export default TotpMain

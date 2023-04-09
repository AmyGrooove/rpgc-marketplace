import { SUMBIT_PLUS } from '../../../../../theme/sources'
import { I2FA } from '../interfaces'

import './ConfirmStyle.scss'
import OtpInput from 'react-otp-input'

import useConfirmation from '../../hooks/useConfirmation'

const OtherModal = ({ closeModal }: I2FA) => {
  const { code, setCode, wrongCode, tracePhone, seconds, setSeconds } =
    useConfirmation()

  const number = '+798165312'

  return (
    <>
      <div className="overlay" onClick={() => closeModal()} />
      <div className="modal modal-mobile">
        <div className="auth-block">
          <div className="auth-title">
            <div>SMS Confirmation</div>
            <img
              src={SUMBIT_PLUS} alt=""
              onClick={() => closeModal()} />
          </div>
          <div className="mfa-input-field">
            <OtpInput
              value={code}
              onChange={(event: any) => setCode(event)}
              numInputs={6}
              isInputNum={true}
              separator={<span style={{ width: '16px' }} />}
            />
            {wrongCode && <div className="wrong-code">Wrong code</div>}
            <div className="code-text">
              We have sent a confirmation code to{' '}
              {' ' + tracePhone(number) + ' '}
              Please enter it.
            </div>
            <div
              className="code-sec"
              onClick={seconds >= 0 ? () => {} : () => setSeconds(30)}
            >
              Send code again {seconds >= 0 && seconds + 's'}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default OtherModal

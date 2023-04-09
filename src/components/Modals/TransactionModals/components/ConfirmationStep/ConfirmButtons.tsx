import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

import useMobile from '../../../../../hooks/useMobile'
import { MfaStore } from '../../../../../stores'
import { Icon } from '../../../../common'
import { IConfirmButtons } from '../interfaces'

const ConfirmButtons = observer(
  ({ setState, selectedType }: IConfirmButtons) => {
    const { mobile } = useMobile()
    const { mfaEnable, check2fa } = MfaStore

    useEffect(() => {
      check2fa()
    }, [])

    return (
      <div className="auth-buttons-block">
        <button
          className={`auth-button ${
            !mfaEnable.isGoogleEnabled ? 'disabled' : ''
          } ${selectedType === 0 ? 'active' : ''}`}
          onClick={mfaEnable.isGoogleEnabled ? () => setState(0) : () => {}}
        >
          <Icon icon="TOTPIcon" />
          <div>
            <div className="auth-text">Google Auth</div>
            {!mobile && <div className="recommended">recommended</div>}
          </div>
          {mobile && <div className="recommended rec-mobile">recommended</div>}
        </button>
        <button
          className={`auth-button ${
            !mfaEnable.isEmailEnabled ? 'disabled' : ''
          } ${selectedType === 1 ? 'active' : ''}`}
          onClick={mfaEnable.isEmailEnabled ? () => setState(1) : () => {}}
        >
          <Icon icon="EmailIcon" />
          <div>
            <div className="auth-text">Email</div>
          </div>
        </button>
        <button
          className={`auth-button ${
            !mfaEnable.isSmsEnabled ? 'disabled' : ''
          } ${selectedType === 2 ? 'active' : ''}`}
          onClick={mfaEnable.isSmsEnabled ? () => setState(2) : () => {}}
        >
          <Icon icon="OtherIcon" />
          <div>
            <div className="auth-text">Other</div>
          </div>
        </button>
      </div>
    )
  },
)

export default ConfirmButtons

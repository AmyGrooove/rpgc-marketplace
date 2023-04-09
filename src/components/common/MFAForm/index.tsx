import { useEffect, useState } from 'react'
import './index.scss'
import OtpInput from 'react-otp-input'
import classNames from 'classnames'

import { AuthFormBtn } from '../'

interface MFAFormProps {
  setValue: (value: string) => void;
  value: string;
  mode: string;
  setMode: (value: string) => void;
  setMfa: (value: boolean) => void;
}

const MFAForm = ({ setValue, value, mode, setMode, setMfa }: MFAFormProps) => {
  const [seconds, setSeconds] = useState<number | null>(null)

  const onChangeHandler = (e: any) => {
    setValue(e)
  }

  const backBtnClickHandler = () => {
    switch (mode) {
    case 'Google':
      setMfa(false)
      break
    case 'SMS':
      setMode('Google')
      setSeconds(null)
      break
    case 'Email':
      setMode('Google')
      setSeconds(null)
      break
    default:
      setMfa(false)
    }
  }

  useEffect(() => {
    let n = 0

    const timerId = setInterval(() => {
      if (seconds) {
        setSeconds(seconds - n)
        n += 1
      }
    }, 500)

    if (n === 30) {
      clearInterval(timerId)
      setSeconds(null)
    }

    return () => clearInterval(timerId)
  }, [seconds])

  const setSMSHandler = () => {
    setMode('SMS')
    setSeconds(30)
  }

  const setEmailHandler = () => {
    setMode('Email')
    setSeconds(30)
  }

  const sendCodeHandler = () => {
    setSeconds(30)
  }

  return (
    <div className={'auth-input-container'}>
      <div className={'auth-form-title'}>
        {mode === 'Google'
          ? '2-FA'
          : mode === 'SMS'
            ? 'Code from SMS'
            : 'Code from email'}
        <div className={'auth-form-description'}>
          {mode === 'Google'
            ? 'Code was sent to Google Auth app'
            : mode === 'SMS'
              ? 'Sent to number'
              : 'Sent to email'}
        </div>
      </div>
      <div className={'mfa-input-field'}>
        <OtpInput
          value={value}
          onChange={(event: any) => onChangeHandler(event)}
          numInputs={6}
          isInputNum={true}
          separator={<span style={{ width: '16px' }} />}
        />
      </div>
      <div className={'MFAForm-actions-container'}>
        <AuthFormBtn>Continue</AuthFormBtn>
        <AuthFormBtn style="transparent" onClick={backBtnClickHandler}>
          Back
        </AuthFormBtn>
      </div>
      <div
        className={classNames(
          'form-change-actions-container',
          seconds && 'form-change-actions-container_disabled',
        )}
      >
        {mode === 'Google' && (
          <>
            <span onClick={setSMSHandler}>Auth via SMS code</span>
            <span onClick={setEmailHandler}>Auth via Email code</span>
          </>
        )}
        {mode !== 'Google' && (
          <span onClick={!seconds ? () => sendCodeHandler() : () => {}}>
            {`Send code again ${!seconds ? '' : `${seconds}s`}`}
          </span>
        )}
      </div>
    </div>
  )
}

export default MFAForm

import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import {
  LOGIN_BCG,
  MFA_EMAIL_BCG,
  MFA_GOOGLE_BCG,
  MFA_SMS_BCG,
} from '../../theme/sources'
import { Icon, MFAForm, AuthForm } from '../../components/common/'
import { AmplifyStore } from '../../stores'

import './index.scss'

const Authorization = observer(() => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [mfa, setMfa] = useState(false)
  const [mode, setMode] = useState('Google')

  const setLoginHandler = (value: string) => {
    setLogin(value)
    setError('')
  }

  const setPasswordHandler = (value: string) => {
    setPassword(value)
    setError('')
  }

  const formSubmitHandler = () => {
    AmplifyStore.login(login, password)
      .then(() => {
        setLogin('')
        setPassword('')
        setMfa(true)
      })
      .catch((err: any) => {
        if (err.code === 'InvalidParameterException') {
          setError('Please enter your username and password!')
        } else {
          setError(err.message)
        }
      })
  }

  const keyDownHandler = (event: KeyboardEvent) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      formSubmitHandler()
    }
  }

  const backgroundPickingHandler = () => {
    if (!mfa) {
      return LOGIN_BCG
    }

    switch (mode) {
    case 'Google':
      return MFA_GOOGLE_BCG
    case 'SMS':
      return MFA_SMS_BCG
    case 'Email':
      return MFA_EMAIL_BCG
    default:
      return MFA_GOOGLE_BCG
    }
  }

  useEffect(() => {
    AmplifyStore.checkUserSession().then(() => {
      if (AmplifyStore.user) {
        setMfa(true)
      }
    })
  }, [])

  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `url(${backgroundPickingHandler()})`,
        transition: '0.2s',
      }}
    >
      <div className="logo">
        <Icon icon="logoIcon" />
        <span>Marketplace</span>
      </div>
      <div className={'auth-form-container'}>
        {!mfa ? (
          <MFAForm
            setValue={setOtp}
            value={otp}
            mode={mode}
            setMode={setMode}
            setMfa={setMfa}
          />
        ) : (
          <>
            {/*<AuthForm*/}
            {/*  setLogin={setLoginHandler}*/}
            {/*  setPassword={setPasswordHandler}*/}
            {/*  emailValue={login}*/}
            {/*  passwordValue={password}*/}
            {/*  onSubmit={formSubmitHandler}*/}
            {/*  onKeyDown={(event: KeyboardEvent) => keyDownHandler(event)}*/}
            {/*/>*/}
            <div className={'error-message'}>{error}</div>
          </>
        )}
      </div>
      <div className={'game-name-container'}>
        <div>Game</div>
        <span>Dustland</span>
      </div>
    </div>
  )
})

export default Authorization

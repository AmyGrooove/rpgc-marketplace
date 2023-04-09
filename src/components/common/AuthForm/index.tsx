import React, { useCallback, useState } from 'react'

import './index.scss'
import classNames from 'classnames'

import { Icon, AuthFormBtn } from '../'
import useMobile from '../../../hooks/useMobile'
import { RPGC_LOGO } from '../../../theme/sources'

interface AuthFormProps {
  setLogin: (value: string) => void
  setPassword: (value: string) => void
  emailValue: string
  passwordValue: string
  onSubmit: () => void
  onBackClick: () => void
  // @ts-ignore
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void
  error: string
}

const AuthForm = ({
  setLogin,
  setPassword,
  emailValue,
  passwordValue,
  onSubmit,
  onBackClick,
  onKeyDown,
  error,
}: AuthFormProps): JSX.Element => {
  const [inputType, setInputType] = useState('password')
  const [loginFocused, setLoginFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [checked, setChecked] = useState(false)
  const { mobile } = useMobile()

  const loginLabelClickHandler = useCallback(() => {
    const el = document.getElementById('login-input')
    if (el) {
      el.focus()
    }
  }, [])

  const passwordLabelClickHandler = useCallback(() => {
    const el = document.getElementById('password-input')
    if (el) {
      el.focus()
    }
  }, [])

  const inputTypeToggleHandler = () => {
    if (inputType === 'password') {
      setInputType('text')
    } else {
      setInputType('password')
    }
  }

  return (
    <div className={'input-container'}>
      {mobile && (
        <div className={'form-header'}>
          <img src={RPGC_LOGO} alt={''} />
          Welcome to Marketplace
          <Icon icon={'greyCloseBtn'} onClick={onBackClick} />
        </div>
      )}
      <form>
        <div className={'input-field'}>
          <label
            onClick={loginLabelClickHandler}
            className={classNames(
              'label',
              loginFocused && 'label_focused',
              emailValue && 'label_focused',
              error && 'label_focused-error',
            )}
          >
            Login
          </label>
          <input
            id={'login-input'}
            value={emailValue}
            type={'text'}
            onChange={(event) => setLogin(event.target.value)}
            onKeyDown={onKeyDown ? (event) => onKeyDown(event) : () => {}}
            onFocus={() => setLoginFocused(true)}
            onBlur={() => setLoginFocused(false)}
          />
        </div>
        <div className={'input-field'}>
          <label
            onClick={passwordLabelClickHandler}
            className={classNames(
              'label',
              passwordFocused && 'label_focused',
              passwordValue && 'label_focused',
              error && 'label_focused-error',
            )}
          >
            Password
          </label>
          <input
            id={'password-input'}
            value={passwordValue}
            type={inputType}
            onChange={(event) => setPassword(event.target.value)}
            onKeyDown={onKeyDown ? (event) => onKeyDown(event) : () => {}}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
          />
          <div className={'password-icon'} onClick={inputTypeToggleHandler}>
            <Icon icon={inputType === 'text' ? 'hidePasswordIcon' : 'showPasswordIcon'} />
          </div>
        </div>
      </form>
      {error && <div className={'error-message'}>{error}</div>}
      <div
        className={classNames(
          'checkbox-container',
          checked && 'checked',
        )}
        onClick={() => setChecked(!checked)}
      >
        <Icon icon={'checkBoxGrey'} />
        <span>
          Remember me
        </span>
      </div>
      <div className={'btn-container'}>
        <AuthFormBtn
          onClick={onSubmit}
          onKeyDown={onKeyDown ? (event) => onKeyDown(event) : () => {}}
        >
          <Icon icon={'signInIcon'} />
          Sign In
        </AuthFormBtn>
      </div>
    </div>
  )
}

export default AuthForm

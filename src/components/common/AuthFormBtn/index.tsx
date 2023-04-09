import React from 'react'
import classNames from 'classnames'
import './index.scss'

interface AuthFormBtnProps {
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  children: any;
  style?: string;
}

const AuthFormBtn = ({
  onClick,
  onKeyDown,
  children,
  style,
}: AuthFormBtnProps) => {
  return (
    <div
      className={classNames(
        'auth-form-btn',
        style === 'transparent' && 'auth-form-btn_transparent',
      )}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      {children}
    </div>
  )
}

export default AuthFormBtn

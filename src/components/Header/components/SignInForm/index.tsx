import './index.scss'
import { useState } from 'react'

import { AuthForm } from '../../../common'
import { AmplifyStore } from '../../../../stores'
import ModalContainer from '../ModalContainer'

interface SignInformProps {
  setSignedIn: (value: boolean) => void
  setFormVisible: () => void
  formVisible: boolean
}

const SignInForm = ({ setSignedIn, setFormVisible, formVisible }: SignInformProps) => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

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
        setSignedIn(true)
        setFormVisible()
      })
      .catch((err: any) => {
        if (!password || !login ) {
          setError('Please enter your username and password!')
        } else {
          setError('Invalid username or password!')
        }
      })
  }

  const keyDownHandler = (event: KeyboardEvent) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      formSubmitHandler()
    }
  }

  return (
    <ModalContainer visible={formVisible}>
      <AuthForm
        setLogin={setLoginHandler}
        setPassword={setPasswordHandler}
        emailValue={login}
        passwordValue={password}
        onSubmit={formSubmitHandler}
        onBackClick={setFormVisible}
        onKeyDown={(event: KeyboardEvent) => keyDownHandler(event)}
        error={error}
      />
    </ModalContainer>
  )
}

export default SignInForm
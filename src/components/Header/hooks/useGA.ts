import { useEffect, useState } from 'react'

import { apiClient } from '../../../providers/api'
import { AmplifyStore, MfaStore } from '../../../stores'
import { APPLE_ICON, PLAYMARKET_ICON } from '../../../theme/sources'
import useModal from '../../Modals/ModalProvider/useModal'

const useGA = () => {
  const [token, setToken] = useState<string>('')
  const [code, setCode] = useState<string>('')
  const [wrongCode, setWrongCode] = useState<boolean>(false)
  const [openInfo, setOpenInfo] = useState<boolean>(false)

  const { checkUserSession } = AmplifyStore
  const { mfaEnable, check2fa } = MfaStore

  const { setModal } = useModal()

  useEffect(() => {
    if (!mfaEnable.isGoogleEnabled) {
      checkUserSession().then((response: any) => {
        apiClient
          .get('/auth-2fa/get-secret', {
            headers: { Authorization: 'Bearer ' + response.jwtToken },
          })
          .then((responseObj) => {
            setToken(responseObj.data.secret)
          })
      })
    }
  }, [])

  useEffect(() => {
    if (code.length === 6) {
      checkUserSession().then((response: any) => {
        apiClient
          .get(
            `/auth-2fa/${mfaEnable.isGoogleEnabled ? 'disable' : 'enable'}`,
            {
              params: {
                auth2fa_code: code,
              },
              headers: { Authorization: 'Bearer ' + response.jwtToken },
            },
          )
          .then(() => {
            setModal(null)
            setCode('')
            setWrongCode(false)
            check2fa()
          })
          .catch(() => {
            setWrongCode(true)
          })
      })
    } else {
      setWrongCode(false)
    }
  }, [code])

  const authLinks = [
    {
      name: 'App Store',
      description: 'Download for iOS',
      icon: APPLE_ICON,
      href: 'https://apps.apple.com/us/app/google-authenticator/id388497605',
    },
    {
      name: 'Google Play',
      description: 'Download for Android',
      icon: PLAYMARKET_ICON,
      href: 'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2',
    },
  ]

  return {
    code,
    setCode,
    wrongCode,
    token,
    authLinks,
    openInfo,
    setOpenInfo,
  }
}

export default useGA

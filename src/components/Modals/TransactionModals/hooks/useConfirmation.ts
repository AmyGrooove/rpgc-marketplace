import { useContext, useEffect, useState } from 'react'

import { apiClient } from '../../../../providers/api'
import { AmplifyStore } from '../../../../stores'
import { APPLE_ICON, PLAYMARKET_ICON } from '../../../../theme/sources'
import TransactionContext from '../components/TransactionContext'

import useExchange from './useExchange'

const useConfirmation = () => {
  const { step, setStep } = useContext(TransactionContext)

  const [selectedType, setSelectedType] = useState<number>(1)
  const [open2FA, setOpen2FA] = useState<boolean>(false)
  const [openInfo, setOpenInfo] = useState<boolean>(false)

  const [code, setCode] = useState<string>('')
  const [wrongCode, setWrongCode] = useState<boolean>(false)

  const { user } = AmplifyStore

  const { sumbitOffer } = useExchange()

  useEffect(() => {
    if (code.length === 6) {
      apiClient
        .get('/auth-2fa/2fa-ping', {
          params: {
            auth2fa_code: code,
          },
          headers: { Authorization: 'Bearer ' + user.jwtToken },
        })
        .then(() => {
          setStep(step + 1)
          setCode('')
          setWrongCode(false)
          sumbitOffer()
        })
        .catch(() => {
          setWrongCode(true)
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

  const [seconds, setSeconds] = useState<number>(30)

  setTimeout(() => {
    if (seconds > 0) {
      setSeconds(seconds - 1)
    }
  }, 1000)

  const traceEmail = (value: string) => {
    return value.replace(/@.*?\./, '*****')
  }

  const tracePhone = (value: string) => {
    const buf = value.substr(-2)
    return value.slice(0, -7) + '*****' + value.substr(-2)
  }

  return {
    selectedType,
    setSelectedType,
    open2FA,
    setOpen2FA,
    code,
    setCode,
    wrongCode,
    authLinks,
    openInfo,
    setOpenInfo,
    traceEmail,
    seconds,
    setSeconds,
    tracePhone,
  }
}

export default useConfirmation

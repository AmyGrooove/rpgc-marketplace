import { useEffect, useState } from 'react'

import { apiClient } from '../providers/api'
import { AmplifyStore } from '../stores'

const useGetSecret = () => {
  const [token, setToken] = useState<string>('')
  const { user } = AmplifyStore

  useEffect(() => {
    apiClient
      .get('/auth-2fa/get-secret', {
        headers: { Authorization: 'Bearer ' + user.jwtToken },
      })
      .then((response) => {
        setToken(response.data.secret)
      })
  }, [])

  return {
    token,
  }
}

export default useGetSecret

import { useState } from 'react'

import { AmplifyStore } from '../../../stores'
import { apiClient } from '../../../providers/api'

const useClaim = () => {
  const [claim, setClaim] = useState<string>('')
  const { user } = AmplifyStore

  // TODO доработать как будет готов бэк
  apiClient
    .get('/user', {
      headers: { Authorization: 'Bearer ' + user.jwtToken },
    })
    .then((response) => {
      setClaim(response.data)
    })

  return {
    claim,
  }
}

export default useClaim

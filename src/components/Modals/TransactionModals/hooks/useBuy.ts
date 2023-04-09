import { useState } from 'react'

const useBuy = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  return {
    loading,
    success,
  }
}

export default useBuy

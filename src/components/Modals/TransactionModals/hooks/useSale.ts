import { useState } from 'react'

const useSale = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  return {
    loading,
    success,
  }
}

export default useSale

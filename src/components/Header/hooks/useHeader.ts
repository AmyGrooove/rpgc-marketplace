import { useEffect } from 'react'

import { Web3Store } from '../../../stores'

const useHeader = () => {
  const { connect } = Web3Store

  useEffect(() => {
    const wallet = localStorage.getItem('WALLET')

    if (wallet !== null) {
      connect(wallet)
    }
  }, [])

  const balance = '0.0000'
  const notification = 3

  const navItems = [
    {
      name: 'All items',
      url: '/all-items',
      notification: false,
    },
    {
      name: 'My items',
      url: '/my-items',
      notification: false,
    },
    {
      name: 'My trades',
      url: '/my-trades',
      notification: true,
    },
  ]

  return {
    navItems,
    balance,
    notification,
  }
}

export default useHeader

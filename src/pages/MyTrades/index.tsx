import './index.scss'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'

import TradesToolbar from './components/TradesToolbar'
import TradesList from './components/TradesList'
import OffersList from './components/OffersList'
import History from './components/History'

const MyTrades = () => {
  const [search, setSearch] = useSearchParams()

  useEffect(() => {
    if (!search.has('myTrades')) {
      search.set('myTrades', 'trades')
    }
    setSearch(search, { replace: true })
  }, [])

  return (
    <div className={'my-trades'}>
      <TradesToolbar />
      {search.get('myTrades') === 'trades' && <TradesList />}
      {search.get('myTrades') === 'my-offers' && <OffersList />}
      {search.get('myTrades') === 'history' && <History />}
    </div>
  )
}

export default MyTrades

import { ExchangeRow, SaleRow, BuyRow } from '../common/'
import { orderTypes, tradesData } from '../TradesList/tempList'

import './index.scss'
import NoTransactions from '../NoTransactions'

const History = () => {
  return (
    <div className={'history'}>
      {tradesData.map((orderData, index) => (
        <div className={'row'} key={index}>
          {orderData.type === orderTypes.exchange && (
            <ExchangeRow orderData={orderData} />
          )}

          {orderData.type === orderTypes.sale && (
            <SaleRow orderData={orderData} />
          )}

          {orderData.type === orderTypes.buy && (
            <BuyRow orderData={orderData} />
          )}
        </div>
      ))}
      {tradesData.length === 0 && <NoTransactions />}
    </div>
  )
}

export default History

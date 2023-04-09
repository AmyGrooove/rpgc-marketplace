import TransactionStore from '../../../../../stores/TransactionStore'

const BuyPrice = () => {
  const { price } = TransactionStore

  return (
    <div>
      <div className="description-text">
        {price + ' RPGC will be deducted from your'}
      </div>
      <div className="description-text">
        crypto wallet. Choose a verification method.
      </div>
    </div>
  )
}

export default BuyPrice

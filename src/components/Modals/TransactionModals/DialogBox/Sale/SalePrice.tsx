import TransactionStore from '../../../../../stores/TransactionStore'

const SalePrice = () => {
  const { price } = TransactionStore

  return (
    <div>
      <div className="description-text">
        {'You are selling an item for ' + price + ' RPGC.'}
      </div>
      <div className="description-text">
        After the sale, the item will not be available. Choose a verification
        method.
      </div>
    </div>
  )
}

export default SalePrice

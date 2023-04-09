import { useContext } from 'react'

import { MarketplaceStore } from '../../../../stores'
import TransactionContext from '../components/TransactionContext'

const ItemInfo = () => {
  const { backButton } = useContext(TransactionContext)
  const { singleItem } = MarketplaceStore

  return (
    <div className="item-block">
      <img src={singleItem.img} alt="" />
      <div className="item-text">
        <div className="item-category">{singleItem.category}</div>
        <div className="item-name">{singleItem.name}</div>
        <div className="item-description">{singleItem.description}</div>
        {backButton && (
          <a href="">
            <button className="back-button">Go to Item page</button>
          </a>
        )}
      </div>
    </div>
  )
}

export default ItemInfo

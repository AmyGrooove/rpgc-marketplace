import { useContext } from 'react'

import { MarketplaceStore } from '../../../../../stores'
import { EDIT_ICON } from '../../../../../theme/sources'
import CancelButton from '../../components/CancelButton'
import useEditOffer from '../../hooks/useEditOffer'
import '../../components/OfferStyles.scss'

const EditOffer = () => {
  const { singleItem } = MarketplaceStore
  const {
    newPrice,
    setNewPriceText,
    canExchange,
    setCanExchange,
    editHandler,
  } = useEditOffer()

  return (
    <>
      <div className="main-block">
        <div className="title-text padding-bottom">Sale Offer</div>
        <div className="mini-title-text2" style={{ maxWidth: '358px' }}>
          The average price of this item is from {singleItem.minPrice} to{' '}
          {singleItem.maxPrice} RPGC. Offer your price.
        </div>
        <label>
          <input
            onChange={(e) => setNewPriceText(e.target.value)}
            value={newPrice}
            className="price-input"
            type="text"
            placeholder=" "
          />
          <span className="price-label">Your price</span>
        </label>
        <div className="checkbox-container">
          <input
            value={canExchange.toString()}
            onClick={() => setCanExchange(!canExchange)}
            id="exchangeBox"
            className="checkbox"
            type="checkbox"
          />
          <label htmlFor="exchangeBox" />
          <div className="checkbox-text">Possibility of exchange</div>
        </div>
      </div>
      <div className="buttons">
        <CancelButton />
        <button className="sumbit-button" onClick={editHandler}>
          <img src={EDIT_ICON} alt="" />
          Edit Offer
        </button>
      </div>
    </>
  )
}

export default EditOffer

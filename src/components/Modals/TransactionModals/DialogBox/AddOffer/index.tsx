import { MarketplaceStore } from '../../../../../stores'
import TransactionStore from '../../../../../stores/TransactionStore'
import {
  BUY_ICON,
  MINI_RPGC_LOGO,
  SALE_ICON,
} from '../../../../../theme/sources'
import CancelButton from '../../components/CancelButton'
import useAddOffer from '../../hooks/useAddOffer'
import '../../components/OfferStyles.scss'

interface IAddOffer {
  mode: boolean;
}

const AddOffer = ({ mode }: IAddOffer) => {
  const { singleItem } = MarketplaceStore
  const {
    newPrice,
    setNewPriceText,
    canExchange,
    setCanExchange,
    addSaleOffer,
  } = useAddOffer()
  const { commission } = TransactionStore

  return (
    <>
      <div className="main-block">
        <div className="title-text padding-bottom">
          {mode ? 'Buy ' : 'Sale '}Offer
        </div>
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
        {mode && (
          <div style={{ marginBottom: '30px' }}>
            <div className="tran-row padding-bottom1">
              <div className="mini-title-text1">Commission</div>
              <div className="row-desc">
                <div className="white-text2">
                  {Number(commission).toFixed(4)}
                </div>
                <div className="rpgc-token">
                  <img src={MINI_RPGC_LOGO} alt="" />
                  <div className="rpgc-text">RPGC</div>
                </div>
              </div>
            </div>
            <div className="tran-row padding-top1 border-top">
              <div className="mini-title-text1">Total amount</div>
              <div className="row-desc">
                <div className="white-text2">
                  {(Number(newPrice) + Number(commission)).toFixed(4)}
                </div>
                <div className="rpgc-token">
                  <img src={MINI_RPGC_LOGO} alt="" />
                  <div className="rpgc-text">RPGC</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="buttons">
        <CancelButton />
        <button className="sumbit-button" onClick={addSaleOffer}>
          <img src={mode ? BUY_ICON : SALE_ICON} alt="" />
          Add Offer
        </button>
      </div>
    </>
  )
}

export default AddOffer

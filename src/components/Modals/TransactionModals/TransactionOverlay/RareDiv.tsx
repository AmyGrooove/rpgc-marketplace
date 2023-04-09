import { useContext } from 'react'

import { MarketplaceStore } from '../../../../stores'
import TransactionContext from '../components/TransactionContext'

const RareDiv = () => {
  const { selectRare } = useContext(TransactionContext)
  const { singleItem } = MarketplaceStore

  return (
    <div className="rare-container">
      <div className="rare-block" id={singleItem.rare}>
        {singleItem.rare && (
          <>
            <img src={selectRare()} alt="" />
            <div className="rare-text">
              {singleItem.rare[0].toUpperCase() + singleItem.rare.slice(1)}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default RareDiv

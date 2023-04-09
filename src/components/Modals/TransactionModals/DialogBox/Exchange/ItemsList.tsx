import { observer } from 'mobx-react-lite'

import { GRAY_ARROW, SUMBIT_PLUS } from '../../../../../theme/sources'
import { IExchange } from '../../components/interfaces'
import useExchange from '../../hooks/useExchange'
import { ExchangeStore, MarketplaceStore } from '../../../../../stores'
import TransactionStore from '../../../../../stores/TransactionStore'

import './ExchangeStyles.scss'
import useMobile from '../../../../../hooks/useMobile'
import { DropDownMenu } from '../../../../common'

import { useContext } from 'react'

import TransactionContext from '../../components/TransactionContext'
import { getAvatar } from '../../../../../dependencies/helper/getAvatar'

const ItemsList = observer(({ user }: IExchange) => {
  const { singleItem } = MarketplaceStore
  const { saleName } = TransactionStore
  const { itemsBuf, count, addItem, removeItem, clearItems, itemsList } =
    ExchangeStore
  const { goContinue, goBack, activePriceSort, setActivePriceSort } =
    useExchange()
  const { mobile } = useMobile()
  const { specificParams } = useContext(TransactionContext)

  const dropdownMenuItems = [
    {
      name: 'Category',
      clickHandler: () => {
        setActivePriceSort('1')
      },
      type: '1',
    },
    {
      name: 'Category',
      clickHandler: () => {
        setActivePriceSort('2')
      },
      type: '2',
    },
  ]

  return (
    <div className="items-list-container" id={singleItem.rare}>
      <div className="item-header">
        <div className="item-header-block">
          <div className="title-text">
            {user ? 'My Items' : mobile ? 'Items' : 'Items for Exchange'}
          </div>
          {!user && (
            <div className="user-block">
              <div className="by-text">by</div>
              <div className="user-block">
                <img src={getAvatar(specificParams.saleIcon)} alt="" />
                {!mobile && <div className="white-text1">{saleName}</div>}
              </div>
            </div>
          )}
        </div>
        <DropDownMenu
          dropdownMenuItems={dropdownMenuItems}
          activeMenu={activePriceSort}
        />
      </div>
      <div className="items-list">
        {itemsList.map((el: any) => (
          <>
            {itemsBuf.find((item) => el.id === item.id) ? (
              <div
                onClick={() => removeItem(el.id)}
                style={mobile ? { height: '80px' } : { height: '175px' }}
              >
                <div
                  className="delete-item"
                  style={mobile ? { left: '305px' } : { left: '127px' }}
                >
                  +
                </div>
                <button
                  id={el.rare}
                  className={`item-element my-items-ex  ${
                    itemsBuf.find((item: any) => el.id === item.id) &&
                    'dedicated'
                  }`}
                >
                  <img src={el.icon} alt="" />
                  <div className="item-text">{el.desc}</div>
                </button>
              </div>
            ) : (
              <button
                id={el.rare}
                onClick={() => addItem(el.id)}
                className="item-element my-items-ex"
              >
                <img src={el.icon} alt="" />
                <div className="item-text">{el.desc}</div>
              </button>
            )}
          </>
        ))}
      </div>
      <div className="item-down-container">
        {!mobile && (
          <div className="selected-container">
            <div className="selected-title">Selected:</div>
            <div className="selected-info">
              <div className="selected-count">{count + ' items'}</div>
              {count !== 0 && (
                <button onClick={clearItems}>
                  <img src={SUMBIT_PLUS} alt="" />
                  <div className="selected-title">Clear</div>
                </button>
              )}
            </div>
          </div>
        )}
        <div className="buttons" id="right">
          <button className="cancel-button" onClick={goBack}>
            Cancel
          </button>
          <button className="sumbit-button" onClick={goContinue}>
            <img src={SUMBIT_PLUS} alt="" />
            Add Items
          </button>
        </div>
      </div>
    </div>
  )
})

export default ItemsList

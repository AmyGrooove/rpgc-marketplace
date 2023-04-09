import classNames from 'classnames'
import './index.scss'

import { Icon } from '../'
import {
  LASTONEARTH_ICON,
  LEGENDARY_ICON,
  RARE_ICON,
  SPECIAL_ICON,
} from '../../../theme/sources'
import Tooltip from '../../Tooltip'

interface ItemCardProps {
  children: any
  itemImg: string
  itemName: string
  rarity: string
  saleOfferAdded?: boolean
  onClick: () => void
}

const ItemCard = ({
  children,
  itemImg,
  itemName,
  rarity,
  saleOfferAdded,
  onClick,
}: ItemCardProps) => {

  const rarityHandler = () => {
    switch (rarity) {
    case 'rare':
      return RARE_ICON
    case 'special':
      return SPECIAL_ICON
    case 'legendary':
      return LEGENDARY_ICON
    case 'last':
      return LASTONEARTH_ICON
    default:
      return ''
    }
  }

  return (
    <div
      className={classNames(
        'item-card-container',
        rarity === 'rare' && 'rare',
        rarity === 'special' && 'special',
        rarity === 'legendary' && 'legendary',
        rarity === 'last' && 'last',
      )}
      onClick={onClick}
    >
      {rarity !== 'standard' && (
        <div className={'rarity-icon'}>
          <img src={rarityHandler()} alt="" />
        </div>
      )}
      {saleOfferAdded && (
        <Tooltip text={'This item on Sale'}>
          <Icon icon="lockIcon" className={'lock-icon'} />
        </Tooltip>
      )}
      <div
        className={classNames(
          'item-img-container',
          saleOfferAdded && 'item-img-container_disabled',
        )}
      >
        <img
          src={itemImg}
          width="160px"
          height="160px"
          alt=""
        />
      </div>
      <div className="item-description-container">
        <div className="item-name">{itemName}</div>
        <div className="item-price-container">
          {children}
        </div>
      </div>
    </div>
  )
}

export default ItemCard

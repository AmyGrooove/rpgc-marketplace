import classNames from 'classnames'
import { useState } from 'react'

import {
  SPECIAL_ICON,
  RARE_ICON,
  LASTONEARTH_ICON,
  LEGENDARY_ICON,
} from '../../theme/sources'
import './idnex.scss'

const RarityFilter = () => {
  const [rareActive, setRareActive] = useState(false)
  const [specialActive, setSpecialActive] = useState(false)
  const [legendaryActive, setLegendaryActive] = useState(false)
  const [lastOnEarthActive, setLastOnEarthActive] = useState(false)

  return (
    <div className="rarity-filter-container">
      <div
        onClick={() => setRareActive(!rareActive)}
        className={classNames(
          'rarity-filter-item',
          rareActive && 'rarity-filter-item_rare',
        )}
      >
        <img src={RARE_ICON} alt="" />
        <span>Rare</span>
      </div>
      <div
        onClick={() => setSpecialActive(!specialActive)}
        className={classNames(
          'rarity-filter-item',
          specialActive && 'rarity-filter-item_special',
        )}
      >
        <img src={SPECIAL_ICON} alt="" />
        <span>Special</span>
      </div>
      <div
        onClick={() => setLegendaryActive(!legendaryActive)}
        className={classNames(
          'rarity-filter-item',
          legendaryActive && 'rarity-filter-item_legendary',
        )}
      >
        <img src={LEGENDARY_ICON} alt="" />
        <span>Legendary</span>
      </div>
      <div
        onClick={() => setLastOnEarthActive(!lastOnEarthActive)}
        className={classNames(
          'rarity-filter-item',
          lastOnEarthActive && 'rarity-filter-item_last',
        )}
      >
        <img src={LASTONEARTH_ICON} alt="" />
        <span>Last</span>
      </div>
    </div>
  )
}

export default RarityFilter

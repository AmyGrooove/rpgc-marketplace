import { MEDIAN_ICON } from '../../../theme/sources'

import './MedianButtonStyles.scss'
import { NavLink } from 'react-router-dom'

const MedianButton = () => {
  return (
    <NavLink to={document.location.pathname + '/median'}>
      <button className="median-button">
        <img src={MEDIAN_ICON} alt="median" />
      </button>
    </NavLink>
  )
}

export default MedianButton

// Добавляется на страницу с предметом
// Предпологается, что ссылка на страницу будет выглядить так:
// "../id-предмета/median"

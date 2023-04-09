import { useState } from 'react'
import './index.scss'
import classNames from 'classnames'

import { WHITE_TRIANGLE } from '../../theme/sources'

interface TooltipProps {
  children: any;
  text: string;
}

const Tooltip = ({ children, text }: TooltipProps) => {
  const [tooltipVisible, setTooltipVisible] = useState(false)

  return (
    <div
      className="tooltip"
      onMouseOver={() => setTooltipVisible(true)}
      onMouseOut={() => setTooltipVisible(false)}
    >
      {children}
      <div
        className={classNames(
          'tooltiptext',
          tooltipVisible && 'visible',
        )}>
        <div className={'triangle-icon'} />
        {text}
      </div>
    </div>
  )
}

export default Tooltip

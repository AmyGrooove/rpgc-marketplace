import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { Icon } from '../../../../../../components/common'

import './index.scss'
import classNames from 'classnames'

export function Exchange() {
  /*
  const { exchange } = useParams()
  const navigate = useNavigate()
  const [enabled, setEnabled] = useState(exchange)
  */

  const [enabled, setEnabled] = useState(false)

  const clickHandler = () => {
    setEnabled(!enabled)
    // setUrlParam
  }

  return (
    <div
      className={classNames(
        'exchange-checkbox',
        enabled && 'enabled',
      )}
      onClick={clickHandler}
    >
      <Icon icon={enabled ? 'checkBoxActive' : 'checkBox'} />
      <span>Exchange</span>
    </div>
  )
}

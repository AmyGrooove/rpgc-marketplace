import {MINI_RPGC_LOGO} from '../../../theme/sources'

import './index.scss'
import {Icon} from '../index'

type Props = {
  value: string
}

const RpgcValue = ({value}: Props) => {
  return (
    <div className={'rpgc-value'}>
      <div className={'price'}>
        {value}
      </div>
      <div className={'currency'}>
        <img src={MINI_RPGC_LOGO} alt="" />
        <span>{'RPGC'}</span>
      </div>
    </div>
  )
}

export default RpgcValue
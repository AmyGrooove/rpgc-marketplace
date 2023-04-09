import './index.scss'
import { Icon } from '../common'

type Props = {
  value: string
}

const RpgcValueLight = ({value}: Props) => {
  return (
    <div className={'rpgc-value-light'}>
      <div className={'price'}>
        {value}
      </div>
      <div className={'currency'}>
        <Icon icon={'logoDarkWhiteBcgIcon'} />
        <span>{'RPGC'}</span>
      </div>
    </div>
  )
}

export default RpgcValueLight

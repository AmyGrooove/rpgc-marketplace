import { Icon } from '../../../../components/common'
import './index.scss'

type Props = {
  minValue: number | string;
  maxValue: number | string;
};

export function ItemPrice({ minValue, maxValue }: Props): JSX.Element {
  return (
    <div className={'item-price-component'}>
      <div className={'min-max'}>
        <div className={'min'}>
          <div className={'value-icon'}>
            <span className={'value'}>{minValue}</span>
            <Icon icon="logoDarkIcon" />
          </div>

          <div className={'text'}>Sale price, min</div>
        </div>

        <div className={'separator'} />

        <div className={'max'}>
          <div className={'value-icon'}>
            <span className={'value'}>{maxValue}</span>
            <Icon icon="logoDarkIcon" />
          </div>

          <div className={'text'}>Buy price, max</div>
        </div>
      </div>
    </div>
  )
}

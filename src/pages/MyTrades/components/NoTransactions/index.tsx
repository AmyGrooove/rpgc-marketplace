import './index.scss'
import { Icon } from '../../../../components/common'

const NoTransactions = () => {
  return (
    <div className={'no-transactions-container'}>
      <div className={'content'}>
        <Icon icon="sadSmileyIcon" />
        <span>
          No transactions were made
        </span>
      </div>
    </div>
  )
}

export default NoTransactions

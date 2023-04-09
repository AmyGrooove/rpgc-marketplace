import './index.scss'
import { Icon } from '../../../../components/common'

interface NoResultsPageProps {
  result: string | null
}

const NoResultsPage = ({ result }: NoResultsPageProps) => {
  return (
    <div className={'no-results-container'}>
      <div className={'content'}>
        <Icon icon="searchIconBig" />
        <span>
          No results found for{' '}
          <div>"{result}"</div>
        </span>
      </div>
    </div>
  )
}

export default NoResultsPage

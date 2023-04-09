import { Icon } from '../../../../components/common'
import MedianButton from '../../../../components/common/MedianButton/MedianButton'

import './index.scss'
import { useNavigate } from 'react-router-dom'

import { GRAY_ARROW } from '../../../../theme/sources'
import Tooltip from '../../../../components/Tooltip'

const Actions = () => {
  const navigate = useNavigate()

  return (
    <div className={'left-bar'}>
      <div className={'back-btn'} onClick={() => navigate(-1)}>
        <button>
          <img src={GRAY_ARROW} alt="" />
        </button>
        Back
      </div>
      <Tooltip text={'Median price'}>
        <MedianButton />
      </Tooltip>
    </div>
  )
}

export default Actions

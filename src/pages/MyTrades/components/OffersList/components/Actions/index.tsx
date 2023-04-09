import './index.scss'
import { Icon } from '../../../../../../components/common'
import Tooltip from '../../../../../../components/Tooltip'

type Props = {
  editHandler: () => void
  deleteHandler: () => void
}

const Actions = ({editHandler, deleteHandler}: Props) => {
  return (
    <div className={'actions'}>
      <Tooltip text={'Edit offer'}>
        <Icon
          icon="editIcon"
          onClick={editHandler}
        />
      </Tooltip>
      <Tooltip text={'Delete offer'}>
        <Icon
          icon="deleteIcon"
          onClick={deleteHandler}
        />
      </Tooltip>
    </div>
  )
}

export default Actions

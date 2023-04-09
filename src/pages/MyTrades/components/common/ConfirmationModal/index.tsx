import './index.scss'
import classNames from 'classnames'
import { useState } from 'react'

import { Icon } from '../../../../../components/common'

interface IConfirmationModal {
  closeModal: () => void
  actionFunction: () => void
  action: string
}

const ConfirmationModal = ({ closeModal, actionFunction, action }: IConfirmationModal) => {
  const [closed, setClosed] = useState(false)

  const closeModalHandler = () => {
    setClosed(true)
    setTimeout(() => {
      closeModal()
    }, 180)
  }

  const actionHandler = () => {
    actionFunction()
    closeModalHandler()
  }

  return (
    <>
      <div
        className={classNames(
          'modal-backdrop',
          closed && 'closed',
        )}
        onClick={closeModalHandler}
      />
      <div
        className={classNames(
          'confirmation-modal',
          closed && 'closed',
        )}
      >
        <div className={'title'}>
          {action}
        </div>
        <div className={'prompt'}>
          {`Are you sure you want to ${action.toLowerCase()} this offer?`}
        </div>
        <div className={'modal-actions'}>
          <button
            className={'cancel-btn'}
            onClick={closeModalHandler}
          >
            Cancel
          </button>
          <button
            className={'action-btn'}
            onClick={actionHandler}
          >
            {action === 'Delete' && (
              <>
                <Icon icon={'deleteIcon'} />
                {' '}
              </>
            )}
            {`${action} offer`}
          </button>
        </div>
      </div>
    </>
  )
}

export default ConfirmationModal

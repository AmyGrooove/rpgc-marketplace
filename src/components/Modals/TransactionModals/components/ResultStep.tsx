import { useContext } from 'react'

import {
  MY_ITEM_ICON,
  RELOAD_ICON,
  SUCCESS_ICON,
  UNSUCCESS_ICON,
} from '../../../../theme/sources'

import CancelButton from './CancelButton'
import { IResultStep } from './interfaces'
import TransactionContext from './TransactionContext'

const ResultStep = ({ successText, success }: IResultStep) => {
  const { setStep, setModal } = useContext(TransactionContext)

  return (
    <>
      <div className="main-block padding-bottom-block">
        <div className="title-text padding-bottom">
          {success ? 'Success' : 'Unsuccessful'}
        </div>
        <div className="success-block">
          <img src={success ? SUCCESS_ICON : UNSUCCESS_ICON} alt="" />
          <div className="mini-title-text2">
            {success
              ? 'The transaction was successful. ' + successText
              : 'For some reason, the deal did not go through. Try again.'}
          </div>
        </div>
      </div>
      <div className="buttons">
        <CancelButton changedName={success ? 'Continue' : ''} />
        <button
          className="sumbit-button"
          onClick={success ? () => setModal(null) : () => setStep(0)}
        >
          <img src={success ? MY_ITEM_ICON : RELOAD_ICON} alt="" />
          <div>{success ? 'Go My Items' : 'Try Again'}</div>
        </button>
      </div>
    </>
  )
}

export default ResultStep

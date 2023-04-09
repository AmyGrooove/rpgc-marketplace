import { useContext } from 'react'

import { ICancelButton } from './interfaces'
import TransactionContext from './TransactionContext'

const CancelButton = ({ changedName }: ICancelButton) => {
  const { setModal } = useContext(TransactionContext)

  return (
    <button onClick={() => setModal(null)} className="cancel-button">
      {changedName !== undefined && changedName !== '' ? changedName : 'Cancel'}
    </button>
  )
}

export default CancelButton

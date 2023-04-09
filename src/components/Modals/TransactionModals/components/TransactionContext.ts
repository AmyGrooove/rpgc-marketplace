import { createContext } from 'react'

import { ITransactionContext } from './interfaces'

const TransactionContext = createContext<ITransactionContext>({
  step: 0,
  setStep: () => {},
  setModal: () => {},
  selectRare: (() => '') || undefined,
  disableLeftPannel: false,
  setDisableLeftPannel: () => {},
  tranType: '',
  backButton: false,
  specificParams: { offerId: '' },
})

export default TransactionContext

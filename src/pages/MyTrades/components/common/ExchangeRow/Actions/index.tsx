import './index.scss'
import { useState } from 'react'

import ConfirmationModal from '../../ConfirmationModal'

type Props = {
  offerInitiator: number | string,
}

const ExchangeRowActions = ({ offerInitiator }: Props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [action, setAction] = useState('')

  const btnClickHandler = (value: string) => {
    setModalVisible(true)
    setAction(value)
  }

  return (
    <>
      <div className={'exchange-row-actions'}>
        <div className={'reject'}>
          <button onClick={() => btnClickHandler('Reject')}>
            <div>
              {'Reject'}
            </div>
          </button>
        </div>
        {
          /* TODO orderData.offerInitiator === userSession.id && ( */
          offerInitiator === '123' && (
            <div className={'confirm'}>
              <button onClick={() => btnClickHandler('Confirm')}>
                <div>
                  {'Confirm'}
                </div>
              </button>
            </div>
          )
        }
      </div>
      {modalVisible && (
        <ConfirmationModal
          closeModal={() => setModalVisible(false)}
          actionFunction={() => {}}
          action={action}
        />
      )}
    </>
  )
}

export default ExchangeRowActions
import { BUY_ICON } from '../../../../../theme/sources'
import useConfirmation from '../../hooks/useConfirmation'
import CancelButton from '../CancelButton'
import { IConfirmationStep } from '../interfaces'

import ConfirmButtons from './ConfirmButtons'
import EmailModal from './EmailModal'
import OtherModal from './OtherModal'
import TOTPModal from './TOTPModal'

const ConfirmationStep = ({ PriceJSX }: IConfirmationStep) => {
  const { selectedType, setSelectedType, open2FA, setOpen2FA } =
    useConfirmation()

  return (
    <>
      {selectedType === 0 && open2FA && (
        <TOTPModal closeModal={() => setOpen2FA(false)} />
      )}
      {selectedType === 1 && open2FA && (
        <EmailModal closeModal={() => setOpen2FA(false)} />
      )}
      {selectedType === 2 && open2FA && (
        <OtherModal closeModal={() => setOpen2FA(false)} />
      )}
      <div className="confirm-container">
        <div className="title-text">Confirmation</div>
        <PriceJSX />
        <ConfirmButtons
          setState={setSelectedType}
          selectedType={selectedType}
        />
      </div>
      <div className="buttons">
        <CancelButton />
        <button className="sumbit-button" onClick={() => setOpen2FA(true)}>
          <img src={BUY_ICON} alt="" />
          <div>Confirm</div>
        </button>
      </div>
    </>
  )
}

export default ConfirmationStep

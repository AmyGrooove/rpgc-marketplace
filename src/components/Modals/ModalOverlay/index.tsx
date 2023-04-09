import { ReactNode } from 'react'

import useMobile from '../../../hooks/useMobile'
import useModal from '../ModalProvider/useModal'
import './ModalOverlayStyles.scss'

interface IModal {
  children: ReactNode;
  notMobile?: boolean;
  disableOverlayClick?: boolean;
  disableOverlayBack?: boolean;
  modalSX?: string;
}

const ModalOverlay = ({
  children,
  notMobile = false,
  disableOverlayClick = false,
  disableOverlayBack = false,
  modalSX = '',
}: IModal) => {
  const { setModal } = useModal()
  const { mobile } = useMobile()

  return (
    <>
      <div
        id="modalOverlay"
        className="overlay"
        onClick={disableOverlayClick ? () => {} : () => setModal(null)}
        style={disableOverlayBack && !mobile ? { backdropFilter: 'none' } : {}}
      />
      <div
        id="modalObject"
        className={`${modalSX !== '' && !mobile ? modalSX : 'modal'} ${
          !notMobile && 'modal-mobile'
        }`}
      >
        {children}
      </div>
    </>
  )
}

export default ModalOverlay

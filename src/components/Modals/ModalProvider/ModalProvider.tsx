import { useState, ReactNode } from 'react'

import useMobile from '../../../hooks/useMobile'

import { ModalContext } from './ModalContext'
import ModalPortal from './ModalPortal'

interface IModalProviderProps {
  children: ReactNode;
}

const ModalProvider = ({ children }: IModalProviderProps) => {
  const [modal, setModalState] = useState<ReactNode | null>(null)
  const { mobile } = useMobile()

  const setModal = (children: any) => {
    const bodyObject = document.querySelector('body')
    const modalObject = document.getElementById('modalObject')
    const modalOverlay = document.getElementById('modalOverlay')

    if (
      modal !== null &&
      modalObject !== null &&
      modalOverlay !== null &&
      bodyObject !== null
    ) {
      if (mobile) {
        modalObject.style.transform = 'translateY(500px)'
      } else {
        modalObject.style.top = '50px'
        modalObject.style.opacity = '0'
      }

      modalOverlay.style.opacity = '0'
      modalOverlay.style.top = '50px'

      bodyObject.style.overflow = ''

      setTimeout(
        () => {
          setModalState(null)
        },
        mobile ? 300 : 200,
      )
    } else if (bodyObject !== null) {
      if (!(children.props.modalSX === 'connect-profile')) {
        bodyObject.style.overflow = 'hidden'
      }
      setModalState(children)
    }
  }

  return (
    <ModalContext.Provider
      value={{
        modal,
        setModal,
      }}
    >
      <ModalPortal />
      {children}
    </ModalContext.Provider>
  )
}

export { ModalProvider }

import { useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'

import useModal from './useModal'

const modalRootElement = document.querySelector('body')

const ModalPortal = () => {
  const { modal } = useModal()

  const element = useMemo(() => document.createElement('div'), [])
  element.setAttribute('id', 'modal')

  useEffect(() => {
    if (modal !== null) {
      modalRootElement?.appendChild(element)
      return () => {
        modalRootElement?.removeChild(element)
      }
    }
  }, [modal])

  if (modal !== null) {
    return createPortal(<>{modal}</>, element)
  }

  return null
}

export default ModalPortal

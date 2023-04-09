// Импортировать useModal, в котором два элемента -> setModal, modal
// Добавить модалку -> setModal(<ModalOverlay>html-элемент</ModalOverlay>)
// Убрать модалку -> setModal(null)
// modal -> сама html-модалка, но её использовать не нужно, т.к. она импортирована в App.tsx
//
// У самого <ModalOverlay /> есть несколько необязательных параметров
// disableOverlayClick -> нажатие на задний план не уберет модалку

import { useContext } from 'react'

import { ModalContext } from './ModalContext'

const useModal = () => useContext(ModalContext)

export default useModal

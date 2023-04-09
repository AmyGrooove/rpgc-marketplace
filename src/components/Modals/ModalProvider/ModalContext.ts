import { createContext, ReactNode } from 'react'

interface IModalContext {
  modal: ReactNode | null;
  setModal: Function;
}
const ModalContext = createContext<IModalContext>({
  modal: null,
  setModal: () => {},
})

export { ModalContext }

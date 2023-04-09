import './index.scss'
import classNames from 'classnames'

interface ModalContainerProps {
  children: any
  blocked?: boolean
  visible: boolean
}

const ModalContainer = ({ children, blocked, visible }: ModalContainerProps) => {
  return (
    <div
      className={classNames(
        'modal-container',
        blocked && 'blocked',
        visible && 'visible',
      )}
    >
      {children}
    </div>
  )
}

export  default ModalContainer

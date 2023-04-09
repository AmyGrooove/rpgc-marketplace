import '../../../Modals/TransactionModals/components/ConfirmationStep/ConfirmStyle.scss'

import useGA from '../../hooks/useGA'

import GAuthInfo from './GAuthInfo'
import GAuthMain from './GAuthMain'

export interface IGAuthModal {
  dopFunc: Function;
}

const GAuthModal = () => {
  const { openInfo, setOpenInfo } = useGA()

  return (
    <div className="auth-block">
      {openInfo ? (
        <GAuthInfo dopFunc={() => setOpenInfo(false)} />
      ) : (
        <GAuthMain dopFunc={() => setOpenInfo(true)} />
      )}
    </div>
  )
}

export default GAuthModal

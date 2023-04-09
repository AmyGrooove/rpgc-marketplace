import './index.scss'

interface LogoutButtonProps {
  logoutFunction: () => void
}

const LogoutButton = ({ logoutFunction }: LogoutButtonProps) => {
  return (
    <div className={'logout-button'} onClick={logoutFunction}>
      Logout
    </div>
  )
}

export default LogoutButton

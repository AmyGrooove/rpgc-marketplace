import './index.scss'

type Props = {
  icon: string;
  name: string;
};

const MemberInfo = ({ icon, name }: Props) => {
  return (
    <div className={'avatar-name'}>
      <div className={'avatar'}>
        <img src={icon} alt="" />
      </div>
      <div className={'name'}>{name}</div>
    </div>
  )
}

export default MemberInfo

import './index.scss'

type Props = {
  icon: string
  name: string
}

const ItemInfo = ({
  icon,
  name,
}: Props) => {
  return (
    <div className={'item-info'}>
      <img src={icon} alt= "" />
      <span>
        {name}
      </span>
    </div>
  )
}

export default ItemInfo
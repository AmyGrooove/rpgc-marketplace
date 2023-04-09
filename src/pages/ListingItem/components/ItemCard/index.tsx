import './index.scss'

type Props = {
  icon: string;
  name: string;
};

export function ItemCard({ icon, name }: Props) {
  return (
    <div className={'item-card'}>
      <img src={icon} alt="" />
      <div className={'info'}>
        {/* TODO доработать категорию когда появится их реализация */}
        {/*<div className={'category'}>{'Animation effects'}</div>*/}
        <div className={'name'}>{name}</div>
        {/*<div className={'description'}>
          {
            'This is a skin for the Road Sign item, you will be able to apply skin at a repair bench...'
          }
        </div>*/}
      </div>
    </div>
  )
}

import { Icon } from '../../../../../../components/common'
import ItemInfo from '../../ItemInfo'

import './index.scss'
import classNames from 'classnames'
import { useEffect, useState } from 'react'

import useMobile from '../../../../../../hooks/useMobile'
import MemberInfo from '../../MemberInfo'

type Props = {
  myOffer: {
    items: [
      {
        icon: string,
        name: string,
      }
    ]
  }
  memberOffer: {
    items: [
      {
        icon: string,
        name: string,
      }
    ]
  }
  memberIcon: string
  memberName: string
}

const OfferInfo = ({
  myOffer,
  memberOffer,
  memberIcon,
  memberName,
}: Props) => {
  const [myItems, setMyItems] = useState<{ icon: string, name: string }[]>()
  const [myBtnVisible, setMyBtnVisible] = useState(false)
  const [memberItems, setMemberItems] = useState<{ icon: string, name: string }[]>()
  const [memberBtnVisible, setMemberBtnVisible] = useState(false)
  const { mobile } = useMobile()

  useEffect(() => {
    if (myOffer.items.length > 3) {
      setMyBtnVisible(true)
      setMyItems(myOffer.items.slice(0, 3))
    } else {
      setMyItems(myOffer.items.slice(0))
    }

    if (memberOffer.items.length > 3) {
      setMemberBtnVisible(true)
      setMemberItems(memberOffer.items.slice(0, 3))
    } else {
      setMemberItems(memberOffer.items.slice(0))
    }
  }, [])

  const myBtnClickHandler = () => {
    setMyBtnVisible(false)
    setMyItems(myOffer.items.slice(0))
  }

  const memberBtnClickHandler = () => {
    setMemberBtnVisible(false)
    setMemberItems(memberOffer.items.slice(0))
  }

  return (
    <div className={'exchange-offer-info'}>
      <div className={'my-offer'}>
        {mobile && <span className={'exchange-item'}>Item of Exchange</span>}
        {myItems?.map((item: any, index: number) => (
          <div className={'sub-row'} key={index}>
            <ItemInfo icon={item.icon} name={item.name} />
          </div>
        ))}
        {myBtnVisible && (
          <div className={'more-btn'} onClick={myBtnClickHandler}>
            More {myOffer.items.length - 3}+
          </div>
        )}
      </div>
      <Icon icon={'exchange'} />
      <div className={'member-offer'}>
        {mobile && (
          <div className={'member-info-mobile'}>
            <span className={'exchange-item'}>Offer in Return</span>
            <MemberInfo icon={memberIcon} name={memberName} />
          </div>
        )
        }
        {memberItems?.map((item: any, index: number) => (
          <div className={'sub-row'} key={index}>
            <ItemInfo icon={item.icon} name={item.name} />
          </div>
        ))}
        {memberBtnVisible && (
          <div className={'more-btn'} onClick={memberBtnClickHandler}>
            {`More ${memberOffer.items.length - 3}+`}
          </div>
        )}
      </div>
    </div>
  )
}

export default OfferInfo

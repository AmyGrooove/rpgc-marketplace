import { observer } from 'mobx-react-lite'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar, Mousewheel } from 'swiper'

import useExchange from '../../hooks/useExchange'
import { ExchangeStore } from '../../../../../stores'

import 'swiper/css'
import 'swiper/css/scrollbar'
import useMobile from '../../../../../hooks/useMobile'

const AddBlock = observer(() => {
  const { items, removeItem } = ExchangeStore
  const { openList } = useExchange()
  const { mobile } = useMobile()

  return (
    <>
      <Swiper
        grabCursor
        scrollbar
        mousewheel
        slidesPerView={3}
        spaceBetween={mobile ? 15 : 20}
        className="mySwiper"
        modules={[Mousewheel, Scrollbar]}
      >
        <SwiperSlide className="add-block" onClick={openList}>
          <div className="plus-button">+</div>
        </SwiperSlide>
        {items.map((el) => (
          // id={el.rare}
          <SwiperSlide className="added-block" key={el.id}>
            <div
              className="delete-item"
              onClick={() => removeItem(el.id, true)}
            >
              +
            </div>
            <img src={el.icon} alt="" />
          </SwiperSlide>
        ))}
        {[...Array(items.length <= 1 ? 2 - items.length : 0)].map(
          (el, index) => (
            <SwiperSlide
              className="add-block" onClick={openList}
              key={index}>
              <div className="plus-button">+</div>
            </SwiperSlide>
          ),
        )}
      </Swiper>
    </>
  )
})

export default AddBlock

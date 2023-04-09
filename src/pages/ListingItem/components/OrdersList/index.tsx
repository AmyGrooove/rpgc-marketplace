import classNames from 'classnames'

import { Icon } from '../../../../components/common'
import Tooltip from '../../../../components/Tooltip'
import RpgcValue from '../../../../components/common/RpgcValue'
import MemberInfo from '../../../MyTrades/components/common/MemberInfo'
import { Pagination } from '../../../../components/Pagination'
import useUsers from '../../hooks/useUsers'
import { usePagination } from '../../../../hooks/usePagination'
import { useOrdersFilter } from '../../hooks/useOrdersFilter'
import usePriceSort from '../../../../hooks/usePriceSort'
import './index.scss'
import useModal from '../../../../components/Modals/ModalProvider/useModal'
import ModalOverlay from '../../../../components/Modals/ModalOverlay'
import TransactionOverlay from '../../../../components/Modals/TransactionModals/TransactionOverlay'
import { AmplifyStore, MarketplaceStore } from '../../../../stores'

import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { getAvatar } from '../../../../dependencies/helper/getAvatar'

// TODO почистить временные данные (импорт и сам файл)
// import { saleData } from './tempList'

const OrdersList = observer(() => {
  const { currentPage, debouncedPageChangeHandler } = usePagination()
  const { activeFilter } = useOrdersFilter()
  const { activePriceSort } = usePriceSort()

  const { setModal } = useModal()
  const { singleItem } = MarketplaceStore
  const { user } = AmplifyStore

  const { pagination, users } = useUsers({
    params: {
      sortBy: activePriceSort,
      page: currentPage,
    },
    activeFilter,
  })

  return (
    <>
      <div className={'orders-list'}>
        {users.map((userItem, index) => (
          <div className={'row'} key={index}>
            <div className={'left'}>
              {/*TODO заменить иконку на ту что приходит с базы когда это будет реализовано*/}
              <MemberInfo
                name={userItem.username}
                icon={getAvatar(userItem.userId)}
              />
            </div>
            <div className={'right'}>
              <RpgcValue value={userItem.price} />

              {/*TODO: Доработать для активного ордера обмена (иконка лоадера)*/}
              <div className={'exchange-block'}>
                <Tooltip
                  text={!user.authenticated ? 'Sign In required' : 'Exchange'}
                >
                  <Icon
                    className={classNames(
                      'exchange',
                      (!userItem.exchange || !user.authenticated) && 'inactive',
                    )}
                    icon={'exchange'}
                    onClick={
                      userItem.exchange || !user.authenticated
                        ? () =>
                          setModal(
                            <ModalOverlay>
                              <TransactionOverlay
                                id={singleItem.id}
                                tranType={
                                  activeFilter === 'buy'
                                    ? 'exchangemy'
                                    : 'exchangeuser'
                                }
                                specificParams={{
                                  saleIcon: userItem.avatar,
                                  saleName: userItem.username,
                                  saleId: userItem.userId,
                                  offerId: userItem.id,
                                }}
                              />
                            </ModalOverlay>,
                          )
                        : () => {}
                    }
                  />
                </Tooltip>
              </div>
              <div className={'action-block'}>
                {/*<Tooltip text={'Sale now'}>*/}
                <Tooltip
                  text={
                    !user.authenticated
                      ? 'Sign In required'
                      : activeFilter === 'buy'
                        ? 'Buy now'
                        : 'Sale now'
                  }
                >
                  {/*TODO: Скорее всего хэндлер будет при зависимости юзэффекта [search]*/}
                  <Icon
                    icon={activeFilter}
                    // icon={'sale'}
                    className={classNames(
                      'action',
                      !user.authenticated && 'inactive',
                    )}
                    onClick={
                      !user.authenticated
                        ? () => {}
                        : () =>
                          setModal(
                            <ModalOverlay>
                              <TransactionOverlay
                                id={singleItem.id}
                                tranType={activeFilter}
                                specificParams={{
                                  saleIcon: userItem.avatar,
                                  saleName: userItem.username,
                                  saleId: userItem.userId,
                                  offerId: userItem.id,
                                }}
                              />
                            </ModalOverlay>,
                          )
                    }
                  />
                </Tooltip>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={pagination?.totalPages.toString() ?? '0'}
        onPageChange={debouncedPageChangeHandler}
      />
    </>
  )
})

export { OrdersList }

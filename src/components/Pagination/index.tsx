import * as React from 'react'
import ReactPaginate from 'react-paginate'
import { DebouncedFunc } from 'lodash'

import { Icon } from '../common'

import './index.scss'
import useMobile from '../../hooks/useMobile'

export type PaginationProps = {
  currentPage: string
  totalPages: string
  onPageChange: DebouncedFunc<(event: {selected: number}) => void>
}

export const Pagination = React.memo(
  ({ currentPage, totalPages = '1', onPageChange }: PaginationProps): JSX.Element => {
    const { mobile } = useMobile()

    const pageChangeHandler = (event: {selected: number}) => {
      onPageChange(event)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
      <>
        {Number(totalPages) > 1
          ? (
            <div className="pagination">
              <ReactPaginate
                forcePage={Number(currentPage) - 1 < 0 ? 0 : Number(currentPage) - 1}
                className="pagination-items"
                activeClassName="pagination_activePage"
                nextLinkClassName="pagination_next-button"
                previousLinkClassName="pagination_prev-button"
                pageClassName="pagination_page"
                breakLabel="..."
                breakClassName="pagination_page"
                nextLabel={<Icon icon="nextPageIcon" />}
                onPageChange={pageChangeHandler}
                pageRangeDisplayed={
                  mobile
                    ?
                    (Number(currentPage) < 4 ||
                    Number(currentPage) > Number(totalPages) - 2
                      ? 3
                      : 1)
                    : 5
                }
                marginPagesDisplayed={1}
                pageCount={Number(totalPages)}
                previousLabel={<Icon icon="prevPageIcon" />}
              />
            </div>
          )
          : null}
      </>
    )
  },
)

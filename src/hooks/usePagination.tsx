import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import * as React from 'react'
import { debounce } from 'lodash'

export const paginationParam = 'page'
export const paginationDefaultValue = '1'

export function usePagination() {
  const [currentPage, setCurrentPage] = useState<string>(paginationDefaultValue)
  const [search, setSearch] = useSearchParams()

  const handlePageClick = (event: { selected: number }) => {
    const page = event.selected + 1
    setCurrentPage(page.toString())

    search.set(paginationParam, page.toString())
    setSearch(search, { replace: true })
  }

  const debouncedPageChangeHandler = React.useMemo(() => debounce(handlePageClick, 150), [search])

  useEffect(() => {
    if (search.has(paginationParam)) {
      // @ts-ignore
      setCurrentPage(search.get(paginationParam))
    }
  }, [search])

  return {
    currentPage,
    debouncedPageChangeHandler,
  }
}

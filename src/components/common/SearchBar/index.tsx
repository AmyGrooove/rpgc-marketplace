import './index.scss'
import React from 'react'
import classNames from 'classnames'
import { useSearchParams } from 'react-router-dom'
import { debounce } from 'lodash'

import { Icon } from '../'

const searchParam = 'search'

const Index = () => {
  const [searchValue, setSearchValue] = useSearchParams('')

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const onSearchChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value

    if (text.length === 0) {
      searchValue.delete(searchParam)
      setSearchValue(searchValue, {
        replace: true,
      })
    } else {
      searchValue.set(searchParam, text)
      setSearchValue(searchValue, {
        replace: true,
      })
    }
  }, 300)


  return (
    <div
      className={classNames(
        'search-bar-container',
        searchValue.get(searchParam) && 'search-bar-container_focused',
      )}
    >
      <form onSubmit={onSubmitHandler}>
        <input
          id="search-input"
          type="search"
          placeholder="Search"
          maxLength={120}
          defaultValue={searchValue.get(searchParam) ?? ''}
          onChange={(e) => onSearchChange(e)}
        />
        {!searchValue.get(searchParam) && <Icon icon="searchIcon" />}
      </form>
    </div>
  )
}

export default Index

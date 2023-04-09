import React, { useCallback, useState } from 'react'
import './CategoriesFilterStyles.scss'
import classNames from 'classnames'
import { useSearchParams } from 'react-router-dom'

import { CATEGORIES } from '../../theme/sources'
import { Icon } from '../common'
import useMobile from '../../hooks/useMobile'

interface CategoriesFilterProps {
  closeFilter?: () => void
}

const CategoriesFilter = ({ closeFilter }: CategoriesFilterProps) => {
  const [activeCategory, setActiveCategory] = useState<number | undefined>(
    undefined,
  )
  const [categoriesFilterActive, setCategoriesFilterActive] = useState(false)
  const [search, setSearch] = useSearchParams()
  const { mobile } = useMobile()

  const categoryDeleteHandler = useCallback(() => {
    document.querySelectorAll('input').forEach(element => element.checked = false)
    setCategoriesFilterActive(false)
    search.delete('categories')
    setSearch(search, {
      replace: true,
    })
  }, [])

  const categorySettingHandler = (value: number) => {
    if (activeCategory === value) {
      setActiveCategory(undefined)
    } else {
      setActiveCategory(value)
    }
  }

  const onCategoryCheckedHandler =
    (category: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      let categories = search.get('categories')?.split(',') ?? []
      const checked = event.target.checked

      if (checked) {
        categories.push(category)
        setCategoriesFilterActive(true)
      } else {
        categories = categories.filter((_category) => _category !== category)
      }

      if (categories.length === 0) {
        search.delete('categories')
        setCategoriesFilterActive(false)
      } else {
        search.set('categories', categories.join(','))
      }

      setSearch(search, {
        replace: true,
      })
    }

  return (
    <div className="categories-filter-container">
      <div className="categories-filter-title">
        Categories
        {categoriesFilterActive && !mobile &&
          <Icon
            onClick={categoryDeleteHandler}
            icon={'redCircleWhiteCrossIcon'}
          />
        }
        {mobile && (
          <div className={'close-actions'}>
            <Icon
              icon={'tickIcon'}
              className={'tick'}
              onClick={closeFilter ? closeFilter : () => {}}
            />
            <Icon
              icon={'greyCross'}
              className={'cross'}
              onClick={closeFilter ? closeFilter : () => {}}
            />
          </div>
        )}
      </div>
      <div className="categories-container">
        {CATEGORIES.map((item, index) => (
          <div
            key={index}
            className={classNames(
              'category',
              activeCategory === index && 'category_active',
            )}
          >
            {/*<span className="red-dot" />*/}
            <Icon
              icon="arrowIcon"
              onClick={() => categorySettingHandler(index)}
            />
            <div>
              <span
                className={'category-name'}
                onClick={() => categorySettingHandler(index)}
              >
                {item.name}
              </span>
              {item.categories.map((subcategory, i) => (
                <label key={i} className="subcategory">
                  <input
                    id="categories"
                    type="checkbox"
                    onChange={onCategoryCheckedHandler(subcategory)}
                    defaultChecked={search
                      .get('categories')
                      ?.split(',')
                      .includes(subcategory)}
                  />
                  <span className="checkmark" />
                  <span>
                    {subcategory.charAt(0).toUpperCase() +
                      subcategory.slice(1).replace(/_/g, ' ')}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoriesFilter

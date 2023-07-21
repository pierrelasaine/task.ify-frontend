import React from 'react'
import { IDCategoryBarProps } from '../../types'

import './CategoryBar.css'

const CategoryBar: React.FC<IDCategoryBarProps> = ({
    dashboardState,
    setDashboardState
}) => {
    const handleClick = (category: string) => {
        setDashboardState(prevState => ({
            ...prevState,
            currentCategory: category
        }))
    }

    const getCategoryClassName = (category: string) => {
        return category === dashboardState.currentCategory ? 'category-button active' : 'category-button'
    }

    return (
        <section className='category-bar'>
            {dashboardState.categories?.map((category: string) => (
                <React.Fragment key={category}>
                    {' '}
                    &gt;{' '}
                    <button
                        className={getCategoryClassName(category)}
                        onClick={() => handleClick(category)}>
                        {category}
                    </button>{' '}
                </React.Fragment>
            ))}
        </section>
    )
}

export default CategoryBar

import React from 'react'
import { motion } from 'framer-motion'

import ICategoryBarProps from '../../../interfaces/CategoryBarProps'

import './CategoryBar.css'

const CategoryBar: React.FC<ICategoryBarProps> = ({
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
        return category === dashboardState.currentCategory
            ? 'category-button active'
            : 'category-button'
    }

    return (
        <div className='category-bar'>
            {dashboardState.categories?.map((category: string) => (
                <React.Fragment key={category}>
                    {' '}
                    &gt;{' '}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        transition={{
                            type: 'tween',
                            duration: 0.1
                        }}
                        className={getCategoryClassName(category)}
                        onClick={() => handleClick(category)}>
                        {category}
                    </motion.button>{' '}
                </React.Fragment>
            ))}
        </div>
    )
}

export default CategoryBar

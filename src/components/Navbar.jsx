import React from 'react'

const category = ['Now Playing', 'Popular', 'Top Releted', 'Upcoming'];

const Navbar = ({ activeCategory, onCategoryChange }) => {
    return (
        <nav className='flex gap-4 mb-6 bg-gray-900 p-4 rounded'>
            {
                category.map((cate) => (
                    <button key={cate} onClick={() => onCategoryChange(cate)}
                        className={`text-white px-4 py-2 rounded 
                        ${activeCategory === cate ? 'bg-yellow-500 font-bold' : 'bg-gray-700'
                            }`}
                    >{cate}</button>
                ))
            }
        </nav>
    )
}

export default Navbar

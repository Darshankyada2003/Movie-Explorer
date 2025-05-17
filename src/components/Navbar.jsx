import React from 'react';
import { Link } from 'react-router-dom';
import { FiBookmark } from 'react-icons/fi';

const category = [
    { key: 'now_playing', title: 'Now Playing' },
    { key: 'popular', title: 'Popular' },
    { key: 'top_rated', title: 'Top Rated' },
    { key: 'upcoming', title: 'UpComing' }
];

const Navbar = () => {
    return (
        <header className="bg-black text-white px-6 py-3 flex justify-between items-center shadow-md sticky top-0 z-50">
            {/* Logo */}
            <Link to="/" className="text-2xl font-extrabold text-red-600 tracking-wide hover:opacity-90">
                🎬 Movie Explorer
            </Link>

            {/* Navigation */}
            <nav className="flex gap-4 sm:gap-6 items-center text-sm sm:text-base font-medium">
                {category.map((cate) => (
                    <a
                        key={cate.key}
                        href={`#${cate.key}`}
                        className="text-gray-300 hover:text-white px-2 py-1 rounded-md transition duration-200 hover:bg-red-600"
                    >
                        {cate.title}
                    </a>
                ))}

                {/* My List */}
                <Link
                    to="/mylist"
                    className="flex items-center gap-1 text-gray-300 hover:text-white px-3 py-1 rounded-md transition duration-200 hover:bg-red-600"
                >
                    <FiBookmark className="text-lg" />
                    <span className="hidden sm:inline">My List</span>
                </Link>
            </nav>
        </header>
    );
};

export default Navbar;

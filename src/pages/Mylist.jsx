import React, { useEffect, useState } from 'react'

const Mylist = () => {

    const [savedMovie, setSavedMovie] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem('mylist');
        if (stored) {
            setSavedMovie(JSON.parse(stored));
        }
    }, []);

    return (
        <section className='p-6 bg-black min-h-screen'>
            <h2 className='text-2xl font-semibold text-white mb-4'>My List</h2>
            {
                savedMovie.length === 0 ? (
                    <p className='text-gray-400'>You haven't added any movie yet.</p>
                ) : (
                    <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
                        {savedMovie.map((movie) => (
                            <div key={movie.id}
                                className='relative group overflow-hidden rounded-md shadow-lg bg-zinc-900'
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                    alt={movie.title}
                                    className='w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105'
                                />
                                <div className='absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2'>
                                    <div>
                                        <h3 className='text-white text-sm font-semibold truncate'>{movie.title}</h3>
                                        {/* <p className='text-sm text-gray-400'>Rating: {movie.rating}</p> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </ul>
                )
            }
        </section>
    )
}

export default Mylist

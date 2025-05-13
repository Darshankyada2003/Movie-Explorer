import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Home = () => {

    const [allMovies, setAllMovies] = useState({});

    const categories = [
        { key: 'now_playing', title: 'Now Playing' },
        { key: 'popular', title: 'Popular' },
        { key: 'top_rated', title: 'Top Rated' },
        { key: 'upcoming', title: 'UpComing' },
    ];

    const fetchAllMovies = async () => {
        try {
            const request = categories.map(({ key }) =>
                axios.get(`https://api.themoviedb.org/3/movie/${key}`, {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_APP_TMDB_TOKEN}`,
                        Accept: 'application/json'
                    }
                })
            );

            const responses = await Promise.all(request);

            const data = {};
            responses.forEach((res, i) => {
                data[categories[i].key] = res.data.results;
            });
            setAllMovies(data);

        } catch (error) {
            console.error('Failed to fetch movie data:', error);
        }
    }

    useEffect(() => {
        fetchAllMovies();
    }, []);

    return (
        <div className='p-6 bg-gradient-to-b from-black to-gray-900 min-h-screen'>
            {categories.map(({ key, title }) => (
                <section key={key} className='mb-12'>
                    <h2 className='text-3xl text-white font-extrabold mb-6'>{title}</h2>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6'>
                        {allMovies[key]?.map((movie) => (
                            <div
                                key={movie.id}
                                className='bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300'
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.original_title}
                                    className='w-full object-cover'
                                />
                                <div className='p-6'>
                                    <h3 className='text-sm font-semibold text-white truncate'>{movie.original_title}</h3>
                                    <p className='text-xs text-gray-400 mt-1'>{movie.vote_average}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    )
}

export default Home

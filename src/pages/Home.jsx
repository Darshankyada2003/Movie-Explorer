import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

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

        <div className='p-6 bg-gradient-to-b from-black to-gray-900 min-h-screen space-y-12'>
            <Navbar />
            {categories.map(({ key, title }) => (
                <section key={key} className='' id={key}>
                    <h2 className='text-2xl md:text-3xl text-white font-bold mb-6'>{title}</h2>
                    <div className='flex overflow-x-auto space-x-4 no-scrollbar pb-2'>
                        {allMovies[key]?.map((movie) => (
                            <Link to={`/movie/${movie.id}`} key={movie.id}>
                                <div
                                    key={movie.id}
                                    className='min-w-[150px] sm:min-w-[180px] bg-gray-800 rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-300'
                                >
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.original_title}
                                        className='w-full h-60 object-cover'
                                    />
                                    <div className='p-2'>
                                        <h3 className='text-sm font-semibold text-white truncate'>{movie.original_title}</h3>
                                        <p className='text-xs text-gray-400 mt-1'>{movie.vote_average}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    )
}

export default Home

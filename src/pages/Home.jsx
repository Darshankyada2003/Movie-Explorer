import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Home = () => {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const getPopularMovie = async () => {
            try {
                const res = await axios.get(`https://api.themoviedb.org/3/movie/popular`, {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_APP_TMDB_TOKEN}`,
                        Accept: 'application/json'
                    }
                });
                setMovies(res.data.results);
            } catch (error) {
                console.error('Failed to Fetch', (error));
            }
        }
        getPopularMovie();
    }, []);


    return (
        <div className='p-6 bg-gray-100 min-h-screen'>
            <h2 className='text-2xl font-bold mb-4 text-gray-800'>Popular Movies</h2>
            <div className='flex flex-wrap gap-6'>
                {movies && movies.length > 0 && movies.map((movie) => (
                    <div key={movie.id} className='w-36 bg-white shadow-md rounded overflow-hidden'>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.original_title}
                            className='w-full h-52 object-cover' />
                        <div className='p-2'>
                            <h3 className='text-sm font-semibold truncate'>{movie.original_title}</h3>
                            <p className='text-xs text-gray-600'>{movie.vote_average}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home

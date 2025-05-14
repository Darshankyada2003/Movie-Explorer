import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const MovieDetail = () => {

  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credit, setCredit] = useState(null);

  const token = import.meta.env.VITE_APP_TMDB_TOKEN;

  useEffect(() => {
    const movieFetch = async () => {
      try {
        const movieRes = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          }
        });

        const creditRes = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          }
        });

        setMovie(movieRes.data);
        setCredit(creditRes.data);

      } catch (error) {
        console.error('Error fetching movie details', error);
      }
    }
    movieFetch();
  }, [id]);


  return (

    <div className='p-6 bg-gradient-to-b from-black to-gray-900 min-h-screen text-white'>
      {movie && (
        <div className='flex flex-col md:flex-row gap-6'>

          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.name} className='w-full md:w-64 rounded' />
          <div>
            <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
            <p className="text-sm text-gray-400 mb-4">{movie.release_date} • ⭐ {movie.vote_average}</p>
            <div className='mb-4'>
              <strong>Genres:</strong> {''}
              {movie.genres.map((g) => g.name).join(', ')}
            </div>
            <p className='mb-6'>{movie.overview}</p>
            <div>
              <h2 className='text-2xl font-semibold mb-2'>Top Cast</h2>
              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                {credit?.cast?.slice(0, 10).map((actor) => (
                  <div key={actor.id} className='text-center'>
                    <img src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                        : 'https://via.placeholder.com/185x278?text=No+Image'}
                      alt={actor.name}
                      className='w-full h-44 object-cover rounded mb-1'
                    />
                    <p className='text-sm font-semibold'>{actor.name}</p>
                    <p className='text-xs text-gray-400'>as {actor.character}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MovieDetail

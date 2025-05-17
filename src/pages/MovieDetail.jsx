import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";


const MovieDetail = () => {

  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credit, setCredit] = useState(null);

  const [isMyList, setIsMyList] = useState(false);

  const handleToggleMylist = () => {
    if (!movie) return;
    const mylist = JSON.parse(localStorage.getItem('mylist')) || [];

    if (isMyList) {
      const removeMylist = mylist.filter(m => m.id !== movie.id);
      localStorage.setItem('mylist', JSON.stringify(removeMylist));
      setIsMyList(false);
    } else {
      mylist.push({ id: movie.id, title: movie.title, poster_path: movie.poster_path });
      localStorage.setItem('mylist', JSON.stringify(mylist));
      setIsMyList(true);
    }
  }

  useEffect(() => {
    if (!movie) return;
    const mylist = JSON.parse(localStorage.getItem('mylist')) || [];
    setIsMyList(mylist.some(m => m.id === movie.id));
  }, [movie]);

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
    <div className='bg-black text-white min-h-screen'>
      {movie && (
        <div className='relative'>
          {/* BACKDROP */}
          <div className='relative h-[70vh] w-full'>
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className='w-full h-full object-cover brightness-50'
            />
            <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black'></div>
            <div className='absolute bottom-2 left-6 md:left-16 max-w-3xl'>
              <h1 className='text-4xl md:text-6xl font-bold mb-4'>{movie.title}</h1>
              <p className='text-sm text-gray-300 mb-2'>
                {movie.release_date} • ⭐ {movie.vote_average}
              </p>
              <p className='text-gray-200 mb-4'>{movie.genres.map(g => g.name).join(', ')}</p>
              <p className='text-gray-300 hidden md:block'>{movie.overview}</p>
              <button
                onClick={handleToggleMylist}
                title={isMyList ? 'Saved to My List' : 'Save to My List'}
                className={`
        group flex items-center gap-2 px-4 py-2 rounded-md border border-white
        transition-all duration-300 text-sm font-medium uppercase mt-2
        ${isMyList
                    ? ' text-white hover:bg-neutral-800 border-none'
                    : ' text-white hover:bg-white hover:text-black border-none'}
      `}
              >
                {isMyList ? (
                  <AiOutlineCheck size={20} className="transition-transform group-hover:scale-110" />
                ) : (
                  <AiOutlinePlus size={20} className="transition-transform group-hover:scale-110" />
                )}
                <span className="hidden sm:inline">My List</span>
              </button>

            </div>
          </div>

          {/* CAST */}
          {credit && (
            <div className='mt-12 px-6 md:px-16'>
              <h2 className='text-2xl font-semibold mb-4'>Top Cast</h2>
              <div className='flex overflow-x-auto space-x-4 scrollbar-hide pb-2 no-scrollbar'>
                {credit.cast.slice(0, 10).map(actor => (
                  <div key={actor.id} className='min-w-[120px] text-center'>
                    <img
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                          : 'https://via.placeholder.com/185x278?text=No+Image'
                      }
                      alt={actor.name}
                      className='w-full h-44 object-cover rounded mb-1'
                    />
                    <p className='text-sm font-semibold'>{actor.name}</p>
                    <p className='text-xs text-gray-400'>as {actor.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default MovieDetail

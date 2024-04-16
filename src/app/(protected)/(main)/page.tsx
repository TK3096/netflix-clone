import { Billboard } from '@/components/home/Billboard'
import { MovieList } from '@/components/movie/MovieList'

import { getNewTrendingMovies, getRandomMovie } from '@/data/movie'

const HomePage = async () => {
  const randomMovie = await getRandomMovie()
  const trandingMovies = await getNewTrendingMovies()

  if (!randomMovie || !trandingMovies) return null

  return (
    <div className='h-full'>
      <Billboard movie={randomMovie} />
      <div className='mt-10'>
        <MovieList title='Trending Now' movies={trandingMovies} />
      </div>
    </div>
  )
}

export default HomePage

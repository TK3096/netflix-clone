import { auth } from '@/auth'

import { Billboard } from '@/components/home/Billboard'
import { MovieList } from '@/components/movie/MovieList'

import {
  getFavoriteMovies,
  getMovies,
  getNewTrendingMovies,
  getRandomMovie,
} from '@/data/movie'

const HomePage = async () => {
  const session = await auth()

  if (!session) return null

  const randomMovie = await getRandomMovie()
  const trandingMovies = await getNewTrendingMovies()
  const movies = await getMovies()
  const favoriteMovies = await getFavoriteMovies(session?.user?.id!)

  if (!randomMovie || !trandingMovies || !movies) return null

  const actionMovies = movies.filter((movie) => movie.genres.includes('Action'))
  const scifiMovies = movies.filter((movie) => movie.genres.includes('Sci-Fi'))
  const adventureMovies = movies.filter((movie) =>
    movie.genres.includes('Adventure'),
  )
  const dramaMovies = movies.filter((movie) => movie.genres.includes('Drama'))
  const comedyMovies = movies.filter((movie) => movie.genres.includes('Comedy'))

  const favoriteIds = favoriteMovies.map((movie) => movie.id)

  return (
    <div className='h-full'>
      <Billboard movie={randomMovie} />
      <div className='mt-10 space-y-10'>
        <MovieList
          title='Trending Now'
          movies={trandingMovies}
          isNew
          favoriteIds={favoriteIds}
        />
        <MovieList
          title='Action'
          movies={actionMovies}
          favoriteIds={favoriteIds}
        />
        <MovieList
          title='Sci-Fi'
          movies={scifiMovies}
          favoriteIds={favoriteIds}
        />
        <MovieList
          title='Adventure'
          movies={adventureMovies}
          favoriteIds={favoriteIds}
        />
        <MovieList
          title='Drama'
          movies={dramaMovies}
          favoriteIds={favoriteIds}
        />
        <MovieList
          title='Comedy'
          movies={comedyMovies}
          favoriteIds={favoriteIds}
        />
      </div>
    </div>
  )
}

export default HomePage

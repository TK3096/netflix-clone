import { auth } from '@/auth'
import { FavoriteMovieList } from '@/components/movie/FavoriteMovieList'

import { getFavoriteMovies } from '@/data/movie'

const MyListPage = async () => {
  const session = await auth()

  if (!session) return null

  const movies = await getFavoriteMovies(session?.user?.id!)

  return (
    <div className='pt-48 px-10 md:px-20 lg:px-40'>
      <FavoriteMovieList movies={movies} />
    </div>
  )
}

export default MyListPage

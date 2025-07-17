// scripts/show-movie-relations.ts
import 'dotenv/config'
import { db } from '../src/db/index'
import { 
  moviesTable, 
  genresTable, 
  movieGenresTable,
  movieDirectorsTable,
  directorsTable
} from '../src/db/schema/index'
import { eq } from 'drizzle-orm'

async function showMovieRelations() {
  console.log('Showing movie relationships with details...')
  
  try {
    // Get movies with their genres
    const moviesWithGenres = await db
      .select({
        movieId: moviesTable.id,
        movieTitle: moviesTable.title,
        genreId: genresTable.id,
        genreName: genresTable.name
      })
      .from(moviesTable)
      .leftJoin(movieGenresTable, eq(moviesTable.id, movieGenresTable.movieId))
      .leftJoin(genresTable, eq(movieGenresTable.genreId, genresTable.id))
      .orderBy(moviesTable.title)

    // Group by movie
    const movieGenreMap = new Map()
    
    moviesWithGenres.forEach(row => {
      if (!movieGenreMap.has(row.movieId)) {
        movieGenreMap.set(row.movieId, {
          title: row.movieTitle,
          genres: []
        })
      }
      
      if (row.genreName) {
        movieGenreMap.get(row.movieId).genres.push(row.genreName)
      }
    })

    console.log('\nMovies and their genres:')
    console.log('========================')
    
    let moviesWithGenresCount = 0
    let moviesWithoutGenresCount = 0
    
    movieGenreMap.forEach((movieData, movieId) => {
      if (movieData.genres.length > 0) {
        console.log(`${movieData.title}: ${movieData.genres.join(', ')}`)
        moviesWithGenresCount++
      } else {
        console.log(`${movieData.title}: NO GENRES`)
        moviesWithoutGenresCount++
      }
    })
    
    console.log('\nSummary:')
    console.log(`Movies with genres: ${moviesWithGenresCount}`)
    console.log(`Movies without genres: ${moviesWithoutGenresCount}`)
    console.log(`Total movies: ${movieGenreMap.size}`)
    
    // Get movies with their directors
    const moviesWithDirectors = await db
      .select({
        movieTitle: moviesTable.title,
        directorName: directorsTable.firstName,
        directorLastName: directorsTable.lastName
      })
      .from(moviesTable)
      .leftJoin(movieDirectorsTable, eq(moviesTable.id, movieDirectorsTable.movieId))
      .leftJoin(directorsTable, eq(movieDirectorsTable.directorId, directorsTable.id))
      .orderBy(moviesTable.title)

    console.log('\nMovies and their directors:')
    console.log('===========================')
    
    moviesWithDirectors.forEach(row => {
      if (row.directorName) {
        console.log(`${row.movieTitle}: ${row.directorName} ${row.directorLastName}`)
      } else {
        console.log(`${row.movieTitle}: NO DIRECTOR`)
      }
    })
    
  } catch (error) {
    console.error('Error showing relations:', error)
    process.exit(1)
  }
}

showMovieRelations()

// scripts/check-relations.ts
import 'dotenv/config'
import { db } from '../src/db/index'
import { 
  moviesTable, 
  genresTable, 
  movieGenresTable,
  movieDirectorsTable,
  directorsTable
} from '../src/db/schema/index'

async function checkRelations() {
  console.log('Checking database relations...')
  
  try {
    // Check movies
    const movies = await db.select().from(moviesTable)
    console.log(`Found ${movies.length} movies`)
    
    // Check genres
    const genres = await db.select().from(genresTable)
    console.log(`Found ${genres.length} genres`)
    
    // Check directors
    const directors = await db.select().from(directorsTable)
    console.log(`Found ${directors.length} directors`)
    
    // Check movie-genre relationships
    const movieGenreRelations = await db.select().from(movieGenresTable)
    console.log(`Found ${movieGenreRelations.length} movie-genre relationships`)
    
    if (movieGenreRelations.length > 0) {
      console.log('\nFirst 5 movie-genre relationships:')
      movieGenreRelations.slice(0, 5).forEach((rel, index) => {
        console.log(`${index + 1}. Movie ID: ${rel.movieId}, Genre ID: ${rel.genreId}`)
      })
    } else {
      console.log('No movie-genre relationships found!')
    }
    
    // Check movie-director relationships
    const movieDirectorRelations = await db.select().from(movieDirectorsTable)
    console.log(`\nFound ${movieDirectorRelations.length} movie-director relationships`)
    
    if (movieDirectorRelations.length > 0) {
      console.log('\nFirst 5 movie-director relationships:')
      movieDirectorRelations.slice(0, 5).forEach((rel, index) => {
        console.log(`${index + 1}. Movie ID: ${rel.movieId}, Director ID: ${rel.directorId}`)
      })
    } else {
      console.log('No movie-director relationships found!')
    }
    
    // Check if movies and genres have proper IDs
    if (movies.length > 0) {
      console.log(`\nFirst movie: ID=${movies[0].id}, Title="${movies[0].title}"`)
    }
    
    if (genres.length > 0) {
      console.log(`First genre: ID=${genres[0].id}, Name="${genres[0].name}"`)
    }
    
  } catch (error) {
    console.error('Error checking relations:', error)
    process.exit(1)
  }
}

checkRelations()

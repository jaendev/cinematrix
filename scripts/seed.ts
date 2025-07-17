import 'dotenv/config'
import { db } from '../src/db/index'
import {
  usersTable,
  genresTable,
  directorsTable,
  roomsTable,
  moviesTable,
  seatsTable,
  movieGenresTable,
  movieDirectorsTable
} from '../src/db/schema/index'

async function seedDatabase() {
  console.log('Seeding database with sample data...')

  try {
    // Check if data already exists
    const existingUsers = await db.select().from(usersTable).limit(1)
    if (existingUsers.length > 0) {
      console.log('Database already contains data. Skipping seed.')
      process.exit(0)
    }

    console.log('Inserting sample data...')

    // Define sample data with correct types
    const genreData = [
      { name: 'Action', description: 'High-energy films with exciting sequences' },
      { name: 'Drama', description: 'Character-driven stories with emotional depth' },
      { name: 'Comedy', description: 'Films designed to entertain and amuse' },
      { name: 'Horror', description: 'Films intended to frighten and create suspense' },
      { name: 'Sci-Fi', description: 'Science fiction and futuristic themes' },
      { name: 'Romance', description: 'Love stories and romantic relationships' }
    ]

    const directorData = [
      { firstName: 'Christopher', lastName: 'Nolan', nationality: 'British-American' },
      { firstName: 'Quentin', lastName: 'Tarantino', nationality: 'American' },
      { firstName: 'Martin', lastName: 'Scorsese', nationality: 'American' },
      { firstName: 'Greta', lastName: 'Gerwig', nationality: 'American' },
      { firstName: 'Denis', lastName: 'Villeneuve', nationality: 'Canadian' }
    ]

    const roomData = [
      { name: 'Theater 1', capacity: 120 },
      { name: 'Theater 2', capacity: 80 },
      { name: 'IMAX Theater', capacity: 200 },
      { name: 'VIP Theater', capacity: 50 }
    ]

    const movieData = [
      {
        title: 'Inception',
        originalTitle: 'Inception',
        synopsis: 'A thief who steals corporate secrets through dream-sharing technology',
        duration: 148,
        releaseDate: new Date(2010, 7, 16, 12, 30, 0),
        country: 'USA',
        language: 'English',
        rating: 'PG-13',
        price: 12.99
      },
      {
        title: 'Pulp Fiction',
        originalTitle: 'Pulp Fiction',
        synopsis: 'The lives of two mob hitmen, a boxer, and others intertwine',
        duration: 154,
        releaseDate: new Date(1994, 10, 14, 0, 0, 0),
        country: 'USA',
        language: 'English',
        rating: 'R',
        price: 9.99
      },
      {
        title: 'Dune',
        originalTitle: 'Dune',
        synopsis: 'Feature adaptation of Frank Herberts science fiction novel',
        duration: 155,
        releaseDate: new Date(2021, 10, 22, 0, 0, 0),
        country: 'USA',
        language: 'English',
        rating: 'PG-13',
        price: 14.99
      }
    ]

    const userData = [
      {
        email: 'john.doe@example.com',
        password: 'hashed_password_123',
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1234567890'
      },
      {
        email: 'jane.smith@example.com',
        password: 'hashed_password_456',
        firstName: 'Jane',
        lastName: 'Smith',
        phone: '+1987654321'
      }
    ]

    // Insert data and get the inserted records back
    await db.insert(genresTable).values(genreData)
    const genres = await db.select().from(genresTable)
    console.log(`Inserted ${genres.length} genres`)

    await db.insert(directorsTable).values(directorData)
    const directors = await db.select().from(directorsTable)
    console.log(`Inserted ${directors.length} directors`)

    await db.insert(roomsTable).values(roomData)
    const rooms = await db.select().from(roomsTable)
    console.log(`Inserted ${rooms.length} rooms`)

    await db.insert(moviesTable).values(movieData)
    const movies = await db.select().from(moviesTable)
    console.log(`Inserted ${movies.length} movies`)

    await db.insert(usersTable).values(userData)
    const users = await db.select().from(usersTable)
    console.log(`Inserted ${users.length} users`)

    // Create movie-genre relationships
    if (movies.length > 0 && genres.length > 0) {
      await db.insert(movieGenresTable).values([
        { movieId: movies[0].id, genreId: genres[0].id }, // Inception - Action
        { movieId: movies[0].id, genreId: genres[4].id }, // Inception - Sci-Fi
        { movieId: movies[1].id, genreId: genres[0].id }, // Pulp Fiction - Action
        { movieId: movies[1].id, genreId: genres[1].id }, // Pulp Fiction - Drama
        { movieId: movies[2].id, genreId: genres[0].id }, // Dune - Action
        { movieId: movies[2].id, genreId: genres[4].id }  // Dune - Sci-Fi
      ])
      console.log('Created movie-genre relationships')
    }

    // Create movie-director relationships
    if (movies.length > 0 && directors.length > 0) {
      await db.insert(movieDirectorsTable).values([
        { movieId: movies[0].id, directorId: directors[0].id }, // Inception - Nolan
        { movieId: movies[1].id, directorId: directors[1].id }, // Pulp Fiction - Tarantino
        { movieId: movies[2].id, directorId: directors[4].id }  // Dune - Villeneuve
      ])
      console.log('Created movie-director relationships')
    }

    // Generate seats for each room
    for (const room of rooms) {
      const seats = []
      const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
      const seatsPerRow = Math.floor(room.capacity / rows.length)

      for (let i = 0; i < rows.length; i++) {
        for (let j = 1; j <= seatsPerRow; j++) {
          seats.push({
            roomId: room.id,
            row: rows[i],
            number: j,
            isVip: room.name === 'VIP Theater' || (i <= 2 && room.name === 'IMAX Theater')
          })
        }
      }

      if (seats.length > 0) {
        await db.insert(seatsTable).values(seats)
        console.log(`Inserted ${seats.length} seats for ${room.name}`)
      }
    }

    console.log('Database seeded successfully!')
    console.log('\nSample data created:')
    console.log(`- ${users.length} users`)
    console.log(`- ${genres.length} genres`)
    console.log(`- ${directors.length} directors`)
    console.log(`- ${rooms.length} rooms`)
    console.log(`- ${movies.length} movies`)
    console.log('- Movie-genre and movie-director relationships')
    console.log('- Seats for all theaters')
    process.exit(1)

  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()

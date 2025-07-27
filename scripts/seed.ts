// scripts/seed.ts
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
      return
    }

    console.log('Inserting sample data...')

    // Define sample data with correct types
    const genreData = [
      { name: 'Action', description: 'High-energy films with exciting sequences' },
      { name: 'Drama', description: 'Character-driven stories with emotional depth' },
      { name: 'Comedy', description: 'Films designed to entertain and amuse' },
      { name: 'Horror', description: 'Films intended to frighten and create suspense' },
      { name: 'Sci-Fi', description: 'Science fiction and futuristic themes' },
      { name: 'Romance', description: 'Love stories and romantic relationships' },
      { name: 'Thriller', description: 'Suspenseful films designed to keep audiences on edge' },
      { name: 'Fantasy', description: 'Films featuring magical and supernatural elements' },
      { name: 'Crime', description: 'Films focused on criminal activities and investigations' },
      { name: 'Adventure', description: 'Exciting journeys and expeditions' }
    ]

    const directorData = [
      { firstName: 'Christopher', lastName: 'Nolan', nationality: 'British-American' },
      { firstName: 'Quentin', lastName: 'Tarantino', nationality: 'American' },
      { firstName: 'Martin', lastName: 'Scorsese', nationality: 'American' },
      { firstName: 'Greta', lastName: 'Gerwig', nationality: 'American' },
      { firstName: 'Denis', lastName: 'Villeneuve', nationality: 'Canadian' },
      { firstName: 'Steven', lastName: 'Spielberg', nationality: 'American' },
      { firstName: 'Ridley', lastName: 'Scott', nationality: 'British' },
      { firstName: 'Jordan', lastName: 'Peele', nationality: 'American' },
      { firstName: 'Rian', lastName: 'Johnson', nationality: 'American' },
      { firstName: 'Chloe', lastName: 'Zhao', nationality: 'Chinese-American' },
      { firstName: 'Edgar', lastName: 'Wright', nationality: 'British' },
      { firstName: 'Guillermo', lastName: 'del Toro', nationality: 'Mexican' },
      { firstName: 'Ryan', lastName: 'Coogler', nationality: 'American' },
      { firstName: 'Bong', lastName: 'Joon-ho', nationality: 'South Korean' },
      { firstName: 'Patty', lastName: 'Jenkins', nationality: 'American' }
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
        releaseDate: new Date('2010-07-16'),
        country: 'USA',
        language: 'English',
        rating: 'PG-13',
        posterUrl: '/uploads/posters/inception.jpg',
        price: 12.99
      },
      {
        title: 'Pulp Fiction',
        originalTitle: 'Pulp Fiction',
        synopsis: 'The lives of two mob hitmen, a boxer, and others intertwine',
        duration: 154,
        releaseDate: new Date('1994-10-14'),
        country: 'USA',
        language: 'English',
        rating: 'R',
        posterUrl: '/uploads/posters/pulp-fiction.png',
        price: 9.99
      },
      {
        title: 'Dune',
        originalTitle: 'Dune',
        synopsis: 'Feature adaptation of Frank Herberts science fiction novel',
        duration: 155,
        releaseDate: new Date('2021-10-22'),
        country: 'USA',
        language: 'English',
        rating: 'PG-13',
        posterUrl: '/uploads/posters/dune.jpg',
        price: 14.99
      },
      {
        title: 'The Dark Knight',
        originalTitle: 'The Dark Knight',
        synopsis: 'Batman faces his greatest psychological and physical tests',
        duration: 152,
        releaseDate: new Date('2008-07-18'),
        country: 'USA',
        language: 'English',
        rating: 'PG-13',
        posterUrl: '/uploads/posters/the-dark-knight.jpg',
        price: 11.99
      },
      {
        title: 'Goodfellas',
        originalTitle: 'Goodfellas',
        synopsis: 'The story of Henry Hill and his life in the mob',
        duration: 146,
        releaseDate: new Date('1990-09-21'),
        country: 'USA',
        language: 'English',
        rating: 'R',
        posterUrl: '/uploads/posters/goodfellas.jpeg',
        price: 10.99
      },
      {
        title: 'Jurassic Park',
        originalTitle: 'Jurassic Park',
        synopsis: 'Scientists discover a way to bring dinosaurs back to life',
        duration: 127,
        releaseDate: new Date('1993-06-11'),
        country: 'USA',
        language: 'English',
        rating: 'PG-13',
        posterUrl: '/uploads/posters/jurassic-park.jpg',
        price: 10.99
      },
      {
        title: 'Blade Runner 2049',
        originalTitle: 'Blade Runner 2049',
        synopsis: 'A young blade runner discovers a secret that could plunge society into chaos',
        duration: 164,
        releaseDate: new Date('2017-10-06'),
        country: 'USA',
        language: 'English',
        rating: 'R',
        posterUrl: '/uploads/posters/blade-runner-2049.jpg',
        price: 13.99
      },
      {
        title: 'Get Out',
        originalTitle: 'Get Out',
        synopsis: 'A young African-American visits his white girlfriends family estate',
        duration: 104,
        releaseDate: new Date('2017-02-24'),
        country: 'USA',
        language: 'English',
        rating: 'R',
        posterUrl: '/uploads/posters/get-out.jpg',
        price: 12.99
      },
      {
        title: 'Knives Out',
        originalTitle: 'Knives Out',
        synopsis: 'A detective investigates the death of a patriarch of an eccentric family',
        duration: 130,
        releaseDate: new Date('2019-11-27'),
        country: 'USA',
        language: 'English',
        rating: 'PG-13',
        posterUrl: '/uploads/posters/knives-out.jpg',
        price: 12.99
      },
      {
        title: 'Nomadland',
        originalTitle: 'Nomadland',
        synopsis: 'A woman embarks on a journey through the American West',
        duration: 107,
        releaseDate: new Date('2020-12-04'),
        country: 'USA',
        language: 'English',
        rating: 'R',
        posterUrl: '/uploads/posters/nomadland.jpg',
        price: 13.99
      },
      {
        title: 'Baby Driver',
        originalTitle: 'Baby Driver',
        synopsis: 'A talented young getaway driver relies on music to be the best',
        duration: 113,
        releaseDate: new Date('2017-06-28'),
        country: 'USA',
        language: 'English',
        rating: 'R',
        posterUrl: '/uploads/posters/baby-driver.jpg',
        price: 11.99
      },
      {
        title: 'The Shape of Water',
        originalTitle: 'The Shape of Water',
        synopsis: 'A mute woman falls in love with an amphibious creature',
        duration: 123,
        releaseDate: new Date('2017-12-01'),
        country: 'USA',
        language: 'English',
        rating: 'R',
        posterUrl: '/uploads/posters/the-shape-of-water.jpg',
        price: 12.99
      },
      {
        title: 'Black Panther',
        originalTitle: 'Black Panther',
        synopsis: 'TChalla returns home to assume his rightful place as king',
        duration: 134,
        releaseDate: new Date('2018-02-16'),
        country: 'USA',
        language: 'English',
        rating: 'PG-13',
        posterUrl: '/uploads/posters/black-panther.jpg',
        price: 13.99
      },
      {
        title: 'Parasite',
        originalTitle: 'Gisaengchung',
        synopsis: 'A poor family schemes to become employed by a wealthy family',
        duration: 132,
        releaseDate: new Date('2019-05-30'),
        country: 'South Korea',
        language: 'Korean',
        rating: 'R',
        posterUrl: '/uploads/posters/parasite.jpg',
        price: 14.99
      },
      {
        title: 'Wonder Woman',
        originalTitle: 'Wonder Woman',
        synopsis: 'Diana discovers her full powers and her true destiny',
        duration: 141,
        releaseDate: new Date('2017-06-02'),
        country: 'USA',
        language: 'English',
        rating: 'PG-13',
        posterUrl: '/uploads/posters/wonder-woman.jpg',
        price: 12.99
      },
      {
        title: 'Lady Bird',
        originalTitle: 'Lady Bird',
        synopsis: 'A teenager navigates her senior year of high school',
        duration: 94,
        releaseDate: new Date('2017-11-03'),
        country: 'USA',
        language: 'English',
        rating: 'R',
        posterUrl: '/uploads/posters/lady-bird.png',
        price: 11.99
      },
      {
        title: 'Django Unchained',
        originalTitle: 'Django Unchained',
        synopsis: 'A freed slave teams up with a bounty hunter to rescue his wife',
        duration: 165,
        releaseDate: new Date('2012-12-25'),
        country: 'USA',
        language: 'English',
        rating: 'R',
        posterUrl: '/uploads/posters/django-unchained.jpeg',
        price: 11.99
      },
      {
        title: 'Interstellar',
        originalTitle: 'Interstellar',
        synopsis: 'A team of explorers travel through a wormhole in space',
        duration: 169,
        releaseDate: new Date('2014-11-07'),
        country: 'USA',
        language: 'English',
        rating: 'PG-13',
        posterUrl: '/uploads/posters/interestellar.jpg',
        price: 13.99
      },
      {
        title: 'The Departed',
        originalTitle: 'The Departed',
        synopsis: 'An undercover cop and a police informant try to identify each other',
        duration: 151,
        releaseDate: new Date('2006-10-06'),
        country: 'USA',
        language: 'English',
        rating: 'R',
        posterUrl: '/uploads/posters/the-departed.jpg',
        price: 10.99
      },
      {
        title: 'Arrival',
        originalTitle: 'Arrival',
        synopsis: 'A linguist is recruited to help communicate with alien visitors',
        duration: 116,
        releaseDate: new Date('2016-11-11'),
        country: 'USA',
        language: 'English',
        rating: 'PG-13',
        posterUrl: '/uploads/posters/arrival.jpeg',
        price: 12.99
      }
    ]

    const userData = [
      {
        email: 'admin@gmail.com',
        password: '$2b$12$j/XRcyxdwTSnAmvT.L5TAu60V1CKZ26ytHgxfXQglFkzYkw7wo5Gi',
        firstName: 'admin',
        lastName: 'admin',
        phone: '123456789'
      },
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
        // Inception - Action, Sci-Fi, Thriller
        { movieId: movies[0].id, genreId: genres[0].id },
        { movieId: movies[0].id, genreId: genres[4].id },
        { movieId: movies[0].id, genreId: genres[6].id },

        // Pulp Fiction - Action, Drama, Crime
        { movieId: movies[1].id, genreId: genres[0].id },
        { movieId: movies[1].id, genreId: genres[1].id },
        { movieId: movies[1].id, genreId: genres[8].id },

        // Dune - Action, Sci-Fi, Adventure
        { movieId: movies[2].id, genreId: genres[0].id },
        { movieId: movies[2].id, genreId: genres[4].id },
        { movieId: movies[2].id, genreId: genres[9].id },

        // The Dark Knight - Action, Crime, Thriller
        { movieId: movies[3].id, genreId: genres[0].id },
        { movieId: movies[3].id, genreId: genres[8].id },
        { movieId: movies[3].id, genreId: genres[6].id },

        // Goodfellas - Crime, Drama
        { movieId: movies[4].id, genreId: genres[8].id },
        { movieId: movies[4].id, genreId: genres[1].id },

        // Jurassic Park - Adventure, Sci-Fi, Thriller
        { movieId: movies[5].id, genreId: genres[9].id },
        { movieId: movies[5].id, genreId: genres[4].id },
        { movieId: movies[5].id, genreId: genres[6].id },

        // Blade Runner 2049 - Sci-Fi, Thriller
        { movieId: movies[6].id, genreId: genres[4].id },
        { movieId: movies[6].id, genreId: genres[6].id },

        // Get Out - Horror, Thriller
        { movieId: movies[7].id, genreId: genres[3].id },
        { movieId: movies[7].id, genreId: genres[6].id },

        // Knives Out - Crime, Comedy, Thriller
        { movieId: movies[8].id, genreId: genres[8].id },
        { movieId: movies[8].id, genreId: genres[2].id },
        { movieId: movies[8].id, genreId: genres[6].id },

        // Nomadland - Drama
        { movieId: movies[9].id, genreId: genres[1].id },

        // Baby Driver - Action, Crime
        { movieId: movies[10].id, genreId: genres[0].id },
        { movieId: movies[10].id, genreId: genres[8].id },

        // The Shape of Water - Fantasy, Romance, Drama
        { movieId: movies[11].id, genreId: genres[7].id },
        { movieId: movies[11].id, genreId: genres[5].id },
        { movieId: movies[11].id, genreId: genres[1].id },

        // Black Panther - Action, Adventure, Sci-Fi
        { movieId: movies[12].id, genreId: genres[0].id },
        { movieId: movies[12].id, genreId: genres[9].id },
        { movieId: movies[12].id, genreId: genres[4].id },

        // Parasite - Thriller, Drama, Comedy
        { movieId: movies[13].id, genreId: genres[6].id },
        { movieId: movies[13].id, genreId: genres[1].id },
        { movieId: movies[13].id, genreId: genres[2].id },

        // Wonder Woman - Action, Adventure, Fantasy
        { movieId: movies[14].id, genreId: genres[0].id },
        { movieId: movies[14].id, genreId: genres[9].id },
        { movieId: movies[14].id, genreId: genres[7].id },

        // Lady Bird - Comedy, Drama
        { movieId: movies[15].id, genreId: genres[2].id },
        { movieId: movies[15].id, genreId: genres[1].id },

        // Django Unchained - Action, Drama
        { movieId: movies[16].id, genreId: genres[0].id },
        { movieId: movies[16].id, genreId: genres[1].id },

        // Interstellar - Sci-Fi, Drama, Adventure
        { movieId: movies[17].id, genreId: genres[4].id },
        { movieId: movies[17].id, genreId: genres[1].id },
        { movieId: movies[17].id, genreId: genres[9].id },

        // The Departed - Crime, Thriller, Drama
        { movieId: movies[18].id, genreId: genres[8].id },
        { movieId: movies[18].id, genreId: genres[6].id },
        { movieId: movies[18].id, genreId: genres[1].id },

        // Arrival - Sci-Fi, Drama, Thriller
        { movieId: movies[19].id, genreId: genres[4].id },
        { movieId: movies[19].id, genreId: genres[1].id },
        { movieId: movies[19].id, genreId: genres[6].id }
      ])
      console.log('Created movie-genre relationships')
    }

    // Create movie-director relationships
    if (movies.length > 0 && directors.length > 0) {
      await db.insert(movieDirectorsTable).values([
        { movieId: movies[0].id, directorId: directors[0].id },  // Inception - Nolan
        { movieId: movies[1].id, directorId: directors[1].id },  // Pulp Fiction - Tarantino
        { movieId: movies[2].id, directorId: directors[4].id },  // Dune - Villeneuve
        { movieId: movies[3].id, directorId: directors[0].id },  // The Dark Knight - Nolan
        { movieId: movies[4].id, directorId: directors[2].id },  // Goodfellas - Scorsese
        { movieId: movies[5].id, directorId: directors[5].id },  // Jurassic Park - Spielberg
        { movieId: movies[6].id, directorId: directors[6].id },  // Blade Runner 2049 - Ridley Scott
        { movieId: movies[7].id, directorId: directors[7].id },  // Get Out - Jordan Peele
        { movieId: movies[8].id, directorId: directors[8].id },  // Knives Out - Rian Johnson
        { movieId: movies[9].id, directorId: directors[9].id },  // Nomadland - Chloe Zhao
        { movieId: movies[10].id, directorId: directors[10].id }, // Baby Driver - Edgar Wright
        { movieId: movies[11].id, directorId: directors[11].id }, // The Shape of Water - Guillermo del Toro
        { movieId: movies[12].id, directorId: directors[12].id }, // Black Panther - Ryan Coogler
        { movieId: movies[13].id, directorId: directors[13].id }, // Parasite - Bong Joon-ho
        { movieId: movies[14].id, directorId: directors[14].id }, // Wonder Woman - Patty Jenkins
        { movieId: movies[15].id, directorId: directors[3].id },  // Lady Bird - Greta Gerwig
        { movieId: movies[16].id, directorId: directors[1].id },  // Django Unchained - Tarantino
        { movieId: movies[17].id, directorId: directors[0].id },  // Interstellar - Nolan
        { movieId: movies[18].id, directorId: directors[2].id },  // The Departed - Scorsese
        { movieId: movies[19].id, directorId: directors[4].id }   // Arrival - Villeneuve
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

  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()

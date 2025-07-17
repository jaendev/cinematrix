import 'dotenv/config'
import { db } from '../src/db/index'
import {
  wishlistsTable,
  reviewsTable,
  moviePurchasesTable,
  ticketsTable,
  orderItemsTable,
  ordersTable,
  showtimesTable,
  movieDirectorsTable,
  movieGenresTable,
  seatsTable,
  moviesTable,
  roomsTable,
  directorsTable,
  genresTable,
  usersTable
} from '../src/db/schema/index'

async function cleanDatabase() {
  console.log('Cleaning database data while preserving structure...')

  try {
    // Delete in order to respect foreign key constraints
    console.log('Deleting data in dependency order...')

    await db.delete(wishlistsTable)
    console.log('Cleared wishlists')

    await db.delete(reviewsTable)
    console.log('Cleared reviews')

    await db.delete(moviePurchasesTable)
    console.log('Cleared movie purchases')

    await db.delete(ticketsTable)
    console.log('Cleared tickets')

    await db.delete(orderItemsTable)
    console.log('Cleared order items')

    await db.delete(ordersTable)
    console.log('Cleared orders')

    await db.delete(showtimesTable)
    console.log('Cleared showtimes')

    await db.delete(movieDirectorsTable)
    console.log('Cleared movie-director relations')

    await db.delete(movieGenresTable)
    console.log('Cleared movie-genre relations')

    await db.delete(seatsTable)
    console.log('Cleared seats')

    await db.delete(moviesTable)
    console.log('Cleared movies')

    await db.delete(roomsTable)
    console.log('Cleared rooms')

    await db.delete(directorsTable)
    console.log('Cleared directors')

    await db.delete(genresTable)
    console.log('Cleared genres')

    await db.delete(usersTable)
    console.log('Cleared users')

    console.log('\nDatabase cleaned successfully!')
    console.log('All data has been removed while preserving table structure.')
    console.log('\nTo repopulate with sample data, run:')
    console.log('npm run db:seed')

  } catch (error) {
    console.error('Error cleaning database:', error)
    process.exit(1)
  }
}

cleanDatabase()

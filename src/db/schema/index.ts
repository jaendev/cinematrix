// =================== ORDER EXECUTION CONTROLLED ===================
// Tables are exported in order of dependencies to avoid FK errors

// 1. BASE TABLES (without external dependencies)
export * from './01-base/users'
export * from './01-base/genres'
export * from './01-base/directors'
export * from './01-base/rooms'

// 2. TABLES OF CONTENTS (depend on base tables)
export * from './02-content/movies'
export * from './02-content/seats'

// 3. RELATIONSHIP TABLES MANY-TO-MANY
export * from './03-relations/movie-genres'
export * from './03-relations/movie-directors'

// 4. BUSINESS LOGIC TABLES
export * from './04-business/showtimes'
export * from './04-business/orders'

// 5. TRANSACTION TABLES (depend on all of the above) 
export * from './05-transactions/order-items'
export * from './05-transactions/tickets'
export * from './05-transactions/movie-purchases'
export * from './05-transactions/reviews'

// 6. ADDITIONAL FEATURES
export * from './06-features/wishlists'

// =================== DRIZZLE CONFIGURATION ===================
// This object ensures that Drizzle processes tables in the correct order.
import { usersTable } from './01-base/users'
import { genresTable } from './01-base/genres'
import { directorsTable } from './01-base/directors'
import { roomsTable } from './01-base/rooms'
import { moviesTable } from './02-content/movies'
import { seatsTable } from './02-content/seats'
import { movieGenresTable } from './03-relations/movie-genres'
import { movieDirectorsTable } from './03-relations/movie-directors'
import { showtimesTable } from './04-business/showtimes'
import { ordersTable } from './04-business/orders'
import { orderItemsTable } from './05-transactions/order-items'
import { ticketsTable } from './05-transactions/tickets'
import { moviePurchasesTable } from './05-transactions/movie-purchases'
import { reviewsTable } from './05-transactions/reviews'
import { wishlistsTable } from './06-features/wishlists'

// Schema ordenado para drizzle.config.ts
export const schema = {
  // Level 1: Tables base
  usersTable,
  genresTable,
  directorsTable,
  roomsTable,

  // Level 2: Content
  moviesTable,
  seatsTable,

  // Level 3: Relations M2M
  movieGenresTable,
  movieDirectorsTable,

  // Level 4: Business Logic
  showtimesTable,
  ordersTable,

  // level 5: Transactions
  orderItemsTable,
  ticketsTable,
  moviePurchasesTable,
  reviewsTable,

  // Level 6: Features
  wishlistsTable
}

// =================== TYPES EXPORT ===================
export type DbSchema = typeof schema

// Export types for each table
export type { User, NewUser } from './01-base/users'
export type { Genre, NewGenre } from './01-base/genres'
export type { Director, NewDirector } from './01-base/directors'
export type { Room, NewRoom } from './01-base/rooms'
export type { Movie, NewMovie } from './02-content/movies'
export type { Seat, NewSeat } from './02-content/seats'
export type { MovieGenre, NewMovieGenre } from './03-relations/movie-genres'
export type { MovieDirector, NewMovieDirector } from './03-relations/movie-directors'
export type { Showtime, NewShowtime } from './04-business/showtimes'
export type { Order, NewOrder } from './04-business/orders'
export type { OrderItem, NewOrderItem } from './05-transactions/order-items'
export type { Ticket, NewTicket } from './05-transactions/tickets'
export type { MoviePurchase, NewMoviePurchase } from './05-transactions/movie-purchases'
export type { Review, NewReview } from './05-transactions/reviews'
export type { Wishlist, NewWishlist } from './06-features/wishlists'

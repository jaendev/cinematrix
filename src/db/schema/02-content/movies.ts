import { int, mysqlTable, varchar, timestamp, text, date, boolean, decimal, double } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm'
import { wishlistsTable } from '../06-features/wishlists';
import { movieDirectorsTable } from '../03-relations/movie-directors';
import { movieGenresTable } from '../03-relations/movie-genres';
import { showtimesTable } from '../04-business/showtimes';
import { moviePurchasesTable } from '../05-transactions/movie-purchases';
import { reviewsTable } from '../05-transactions/reviews';

export const moviesTable = mysqlTable('movies', {
  id: int().primaryKey().autoincrement(),
  title: varchar({ length: 255 }).notNull(),
  originalTitle: varchar({ length: 255 }),
  synopsis: text(),
  duration: int().notNull(), // in minutes
  releaseDate: date('release_date').notNull(),
  country: varchar({ length: 100 }),
  language: varchar({ length: 50 }),
  rating: varchar({ length: 10 }), // G, PG, PG-13, R, etc.
  posterUrl: varchar('poster_url', { length: 500 }),
  trailerUrl: varchar('trailer_url', { length: 500 }),
  price: double({ precision: 8, scale: 2 }).notNull(), // purchase price
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().onUpdateNow()
})

export const moviesRelations = relations(moviesTable, ({ many }) => ({
  movieGenres: many(movieGenresTable),
  movieDirectors: many(movieDirectorsTable),
  showtimes: many(showtimesTable),
  moviePurchases: many(moviePurchasesTable),
  reviews: many(reviewsTable),
  wishlists: many(wishlistsTable)
}))

export type Movie = typeof moviesTable.$inferSelect
export type NewMovie = typeof moviesTable.$inferInsert

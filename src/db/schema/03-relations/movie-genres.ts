import { mysqlTable, int, primaryKey } from 'drizzle-orm/mysql-core'
import { relations } from 'drizzle-orm'
import { moviesTable } from '../02-content/movies'
import { genresTable } from '../01-base/genres'

export const movieGenresTable = mysqlTable('movie_genres', {
  movieId: int('movie_id').notNull().references(() => moviesTable.id, { onDelete: 'cascade' }),
  genreId: int('genre_id').notNull().references(() => genresTable.id, { onDelete: 'cascade' })
}, (table) => ({
  pk: primaryKey({ columns: [table.movieId, table.genreId] })
}))

export const movieGenresRelations = relations(movieGenresTable, ({ one }) => ({
  movie: one(moviesTable, {
    fields: [movieGenresTable.movieId],
    references: [moviesTable.id]
  }),
  genre: one(genresTable, {
    fields: [movieGenresTable.genreId],
    references: [genresTable.id]
  })
}))

export type MovieGenre = typeof movieGenresTable.$inferSelect
export type NewMovieGenre = typeof movieGenresTable.$inferInsert

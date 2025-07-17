import { mysqlTable, int, primaryKey } from 'drizzle-orm/mysql-core'
import { relations } from 'drizzle-orm'
import { moviesTable } from '../02-content/movies'
import { directorsTable } from '../01-base/directors'

export const movieDirectorsTable = mysqlTable('movie_directors', {
  movieId: int('movie_id').notNull().references(() => moviesTable.id, { onDelete: 'cascade' }),
  directorId: int('director_id').notNull().references(() => directorsTable.id, { onDelete: 'cascade' })
}, (table) => ({
  pk: primaryKey({ columns: [table.movieId, table.directorId] })
}))

export const movieDirectorsRelations = relations(movieDirectorsTable, ({ one }) => ({
  movie: one(moviesTable, {
    fields: [movieDirectorsTable.movieId],
    references: [moviesTable.id]
  }),
  director: one(directorsTable, {
    fields: [movieDirectorsTable.directorId],
    references: [directorsTable.id]
  })
}))

export type MovieDirector = typeof movieDirectorsTable.$inferSelect
export type NewMovieDirector = typeof movieDirectorsTable.$inferInsert

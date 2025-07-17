import { mysqlTable, int, varchar, timestamp, text } from "drizzle-orm/mysql-core";
import { relations } from 'drizzle-orm'
import { movieGenresTable } from "../03-relations/movie-genres";

export const genresTable = mysqlTable('genres', {
  id: int().primaryKey().autoincrement(),
  name: varchar({ length: 50 }).notNull().unique(),
  description: text(),
  createdAt: timestamp('created_at').notNull().defaultNow()
})

export const genresRelations = relations(genresTable, ({ many }) => ({
  movieGenres: many(movieGenresTable)
}))

export type Genre = typeof genresTable.$inferSelect
export type NewGenre = typeof genresTable.$inferInsert

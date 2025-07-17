import { mysqlTable, int, varchar, timestamp, text, date } from "drizzle-orm/mysql-core";
import { relations } from 'drizzle-orm'
import { movieDirectorsTable } from "../03-relations/movie-directors";

export const directorsTable = mysqlTable('directors', {
  id: int().primaryKey().autoincrement(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  biography: text(),
  birthDate: date('birth_date'),
  nationality: varchar({ length: 50 }),
  createdAt: timestamp('created_at').notNull().defaultNow()
})

export const directorsRelations = relations(directorsTable, ({ many }) => ({
  movieDirectors: many(movieDirectorsTable)
}))

export type Director = typeof directorsTable.$inferSelect
export type NewDirector = typeof directorsTable.$inferInsert

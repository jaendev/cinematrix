import { int, mysqlTable, primaryKey, timestamp } from "drizzle-orm/mysql-core";
import { relations } from 'drizzle-orm'
import { moviesTable } from "../02-content/movies";
import { usersTable } from "../01-base/users";

export const wishlistsTable = mysqlTable('wishlists', {
  userId: int('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
  movieId: int('movie_id').notNull().references(() => moviesTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull()
}, (table) => ({
  pk: primaryKey({ columns: [table.userId, table.movieId] })
}))

export const wishlistsRelations = relations(wishlistsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [wishlistsTable.userId],
    references: [usersTable.id]
  }),
  movie: one(moviesTable, {
    fields: [wishlistsTable.movieId],
    references: [moviesTable.id]
  })
}))

export type Wishlist = typeof wishlistsTable.$inferSelect
export type NewWishlist = typeof wishlistsTable.$inferInsert

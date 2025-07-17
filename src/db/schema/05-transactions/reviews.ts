import { boolean, mysqlTable, int, text, timestamp, varchar } from "drizzle-orm/mysql-core";
import { relations } from 'drizzle-orm'
import { usersTable } from "../01-base/users";
import { moviesTable } from "../02-content/movies";

export const reviewsTable = mysqlTable('reviews', {
  id: int().primaryKey().autoincrement(),
  userId: int('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
  movieId: int('movie_id').notNull().references(() => moviesTable.id, { onDelete: 'cascade' }),
  rating: int().notNull(), // 1-5 stars
  title: varchar({ length: 255 }),
  comment: text(),
  isVerifiedPurchase: boolean('is_verified_purchase').default(false).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().onUpdateNow()
})

export const reviewsRelations = relations(reviewsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [reviewsTable.userId],
    references: [usersTable.id]
  }),
  movie: one(moviesTable, {
    fields: [reviewsTable.movieId],
    references: [moviesTable.id]
  })
}))

export type Review = typeof reviewsTable.$inferSelect
export type NewReview = typeof reviewsTable.$inferInsert

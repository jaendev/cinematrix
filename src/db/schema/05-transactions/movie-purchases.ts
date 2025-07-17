import { decimal, int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { relations } from 'drizzle-orm'
import { usersTable } from "../01-base/users";
import { moviesTable } from "../02-content/movies";
import { ordersTable } from "../04-business/orders";

export const moviePurchasesTable = mysqlTable('movie_purchases', {
  id: int().primaryKey().autoincrement(),
  userId: int('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
  movieId: int('movie_id').notNull().references(() => moviesTable.id, { onDelete: 'cascade' }),
  orderId: int('order_id').notNull().references(() => ordersTable.id, { onDelete: 'cascade' }),
  purchaseType: varchar('purchase_type', { length: 20 }).notNull(), // 'rent', 'buy'
  price: decimal({ precision: 8, scale: 2 }).notNull(),
  expiresAt: timestamp('expires_at'), // for rentals, null for purchases
  accessCount: int('access_count').default(0).notNull(),
  maxAccess: int('max_access'), // limit for reproductions
  createdAt: timestamp('created_at').defaultNow().notNull()
})

export const moviePurchasesRelations = relations(moviePurchasesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [moviePurchasesTable.userId],
    references: [usersTable.id]
  }),
  movie: one(moviesTable, {
    fields: [moviePurchasesTable.movieId],
    references: [moviesTable.id]
  }),
  order: one(ordersTable, {
    fields: [moviePurchasesTable.orderId],
    references: [ordersTable.id]
  })
}))

export type MoviePurchase = typeof moviePurchasesTable.$inferSelect
export type NewMoviePurchase = typeof moviePurchasesTable.$inferInsert

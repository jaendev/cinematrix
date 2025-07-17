import { mysqlTable, int, varchar, timestamp, boolean, date } from 'drizzle-orm/mysql-core'
import { relations } from 'drizzle-orm'
import { ordersTable } from '../04-business/orders'
import { moviePurchasesTable } from '../05-transactions/movie-purchases'
import { reviewsTable } from '../05-transactions/reviews'
import { wishlistsTable } from '../06-features/wishlists'

export const usersTable = mysqlTable('users', {
  id: int().primaryKey().autoincrement(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  phone: varchar({ length: 20 }),
  dateOfBirth: date('date_of_birth'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow()
})

export const usersRelations = relations(usersTable, ({ many }) => ({
  orders: many(ordersTable),
  moviePurchases: many(moviePurchasesTable),
  reviews: many(reviewsTable),
  wishlists: many(wishlistsTable)
}))

export type User = typeof usersTable.$inferSelect
export type NewUser = typeof usersTable.$inferInsert

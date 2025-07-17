import { decimal, int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { relations } from 'drizzle-orm'
import { usersTable } from "../01-base/users";
import { moviePurchasesTable } from "../05-transactions/movie-purchases";
import { orderItemsTable } from "../05-transactions/order-items";
import { ticketsTable } from "../05-transactions/tickets";

export const ordersTable = mysqlTable('orders', {
  id: int().primaryKey().autoincrement(),
  userId: int('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
  orderNumber: varchar('order_number', { length: 50 }).notNull().unique(),
  totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
  status: varchar({ length: 20 }).notNull().default('pending'), // pending, completed, cancelled, refunded
  paymentMethod: varchar('payment_method', { length: 50 }), // credit_card, paypal, cash, etc.
  paymentStatus: varchar('payment_status', { length: 20 }).default('pending'), // pending, paid, failed, refunded
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().onUpdateNow()
})

export const ordersRelations = relations(ordersTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [ordersTable.userId],
    references: [usersTable.id]
  }),
  orderItems: many(orderItemsTable),
  tickets: many(ticketsTable),
  moviePurchases: many(moviePurchasesTable)
}))

export type Order = typeof ordersTable.$inferSelect
export type NewOrder = typeof ordersTable.$inferInsert

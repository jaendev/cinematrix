import { decimal, mysqlTable, int, timestamp, varchar } from "drizzle-orm/mysql-core";
import { relations } from 'drizzle-orm'
import { ordersTable } from "../04-business/orders";

export const orderItemsTable = mysqlTable('order_items', {
  id: int().primaryKey().autoincrement(),
  orderId: int('order_id').notNull().references(() => ordersTable.id, { onDelete: 'cascade' }),
  type: varchar({ length: 20 }).notNull(), // 'movie', 'ticket', 'combo'
  itemId: int('item_id'), // movieId, showtimeId, etc.
  itemName: varchar('item_name', { length: 255 }).notNull(),
  quantity: int().notNull().default(1),
  unitPrice: decimal('unit_price', { precision: 8, scale: 2 }).notNull(),
  totalPrice: decimal('total_price', { precision: 8, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

export const orderItemsRelations = relations(orderItemsTable, ({ one }) => ({
  order: one(ordersTable, {
    fields: [orderItemsTable.orderId],
    references: [ordersTable.id]
  })
}))

export type OrderItem = typeof orderItemsTable.$inferSelect
export type NewOrderItem = typeof orderItemsTable.$inferInsert

import { boolean, decimal, mysqlTable, int, timestamp, varchar } from "drizzle-orm/mysql-core";
import { relations } from 'drizzle-orm'
import { showtimesTable } from "../04-business/showtimes";
import { seatsTable } from "../02-content/seats";
import { ordersTable } from "../04-business/orders";

export const ticketsTable = mysqlTable('tickets', {
  id: int().primaryKey().autoincrement(),
  orderId: int('order_id').notNull().references(() => ordersTable.id, { onDelete: 'cascade' }),
  showtimeId: int('showtime_id').notNull().references(() => showtimesTable.id, { onDelete: 'cascade' }),
  seatId: int('seat_id').notNull().references(() => seatsTable.id, { onDelete: 'cascade' }),
  ticketNumber: varchar('ticket_number', { length: 50 }).notNull().unique(),
  price: decimal({ precision: 8, scale: 2 }).notNull(),
  status: varchar({ length: 20 }).notNull().default('active'), // active, used, cancelled
  isUsed: boolean('is_used').default(false).notNull(),
  usedAt: timestamp('used_at'),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

export const ticketsRelations = relations(ticketsTable, ({ one }) => ({
  order: one(ordersTable, {
    fields: [ticketsTable.orderId],
    references: [ordersTable.id]
  }),
  showtime: one(showtimesTable, {
    fields: [ticketsTable.showtimeId],
    references: [showtimesTable.id]
  }),
  seat: one(seatsTable, {
    fields: [ticketsTable.seatId],
    references: [seatsTable.id]
  })
}))

export type Ticket = typeof ticketsTable.$inferSelect
export type NewTicket = typeof ticketsTable.$inferInsert

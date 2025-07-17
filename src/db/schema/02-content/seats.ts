import { mysqlTable, boolean, int, varchar } from "drizzle-orm/mysql-core";
import { relations } from 'drizzle-orm'
import { roomsTable } from '../01-base/rooms'
import { ticketsTable } from "../05-transactions/tickets";

export const seatsTable = mysqlTable('seats', {
  id: int().primaryKey().autoincrement(),
  roomId: int('room_id').notNull().references(() => roomsTable.id, { onDelete: 'cascade' }),
  row: varchar({ length: 2 }).notNull(), // A, B, C, etc.
  number: int().notNull(), // 1, 2, 3, etc.
  isVip: boolean('is_vip').notNull().default(false),
  isActive: boolean('is_active').notNull().default(true)
})

export const seatsRelations = relations(seatsTable, ({ one, many }) => ({
  room: one(roomsTable, {
    fields: [seatsTable.roomId],
    references: [roomsTable.id]
  }),
  tickets: many(ticketsTable)
}))

export type Seat = typeof seatsTable.$inferSelect
export type NewSeat = typeof seatsTable.$inferInsert

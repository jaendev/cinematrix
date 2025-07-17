import { boolean, mysqlTable, int, timestamp, varchar } from "drizzle-orm/mysql-core";
import { relations } from 'drizzle-orm'
import { seatsTable } from "../02-content/seats";
import { showtimesTable } from "../04-business/showtimes";

export const roomsTable = mysqlTable('rooms', {
  id: int().primaryKey().autoincrement(),
  name: varchar({ length: 50 }).notNull().unique(),
  capacity: int().notNull(),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow()
})

export const roomsRelations = relations(roomsTable, ({ many }) => ({
  seats: many(seatsTable),
  showtimes: many(showtimesTable)
}))

export type Room = typeof roomsTable.$inferSelect
export type NewRoom = typeof roomsTable.$inferInsert

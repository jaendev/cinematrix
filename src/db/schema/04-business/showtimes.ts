import { int, boolean, date, decimal, mysqlTable, time, timestamp } from "drizzle-orm/mysql-core";
import { relations } from 'drizzle-orm'
import { moviesTable } from "../02-content/movies";
import { roomsTable } from "../01-base/rooms";
import { ticketsTable } from "../05-transactions/tickets";

export const showtimesTable = mysqlTable('showtimes', {
  id: int().primaryKey().autoincrement(),
  movieId: int('movie_id').notNull().references(() => moviesTable.id, { onDelete: 'cascade' }),
  roomId: int('room_id').notNull().references(() => roomsTable.id, { onDelete: 'cascade' }),
  date: date().notNull(),
  startTime: time('start_time').notNull(),
  endTime: time('end_time').notNull(),
  price: decimal({ precision: 8, scale: 2 }).notNull(), // price by seat
  vipPrice: decimal('vip_price', { precision: 8, scale: 2 }), // price seat VIP
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

export const showtimesRelations = relations(showtimesTable, ({ one, many }) => ({
  movie: one(moviesTable, {
    fields: [showtimesTable.movieId],
    references: [moviesTable.id]
  }),
  room: one(roomsTable, {
    fields: [showtimesTable.roomId],
    references: [roomsTable.id]
  }),
  tickets: many(ticketsTable)
}))

export type Showtime = typeof showtimesTable.$inferSelect
export type NewShowtime = typeof showtimesTable.$inferInsert

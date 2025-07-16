import { int, mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core';

// Example of a simple users table schema using Drizzle ORM with MySQL
export const usersTable = mysqlTable('users_table', {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  age: int().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});
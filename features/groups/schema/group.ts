import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';

export const groups = pgTable('groups', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});
import { pgTable, serial, varchar, text, timestamp, integer, numeric } from 'drizzle-orm/pg-core';

export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  groupId: integer('group_id').notNull(),
  content: text('content').notNull(),
  temperature: numeric('temperature', { precision: 3, scale: 1 }),
  healthStatus: varchar('health_status', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});
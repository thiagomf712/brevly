import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { uuidv7 } from 'uuidv7';

export const shortLinks = pgTable('short_links', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  code: text('code').notNull().unique(),
  originalUrl: text('original_url').notNull(),
  accessCount: integer('access_count').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

import {sqliteTable,text,integer} from 'drizzle-orm/sqlite-core';
export const progress = sqliteTable('learning_progress', {
 userId:text('user_id').primaryKey(),
 data:text('data').notNull(),
 revision:integer('revision').notNull().default(0),
 updatedAt:text('updated_at').notNull()
});

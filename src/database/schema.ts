import { boolean, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    userId: uuid('user_id').defaultRandom().primaryKey(),
    userTgId: varchar('user_tg_id', { length: 32 }).notNull().unique(),
    userFirstName: varchar('user_first_name', { length: 64}).notNull(),
    userLastName: varchar('user_last_name', { length: 64}),
    userUsername: varchar('user_username', { length: 32 }),
    userIsActive: boolean('user_is_active').default(true),
    userCreatedAt: timestamp('user_created_at').notNull().defaultNow()
})
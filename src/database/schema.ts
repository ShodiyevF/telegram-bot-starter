import { boolean, integer, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
    userId: uuid('user_id').defaultRandom().primaryKey(),
    userTgId: varchar('user_tg_id', { length: 32 }).notNull().unique(),
    userFirstName: varchar('user_first_name', { length: 64 }).notNull(),
    userLastName: varchar('user_last_name', { length: 64 }),
    userUsername: varchar('user_username', { length: 32 }),
    userIsActive: boolean('user_is_active').default(true),
    userCreatedAt: timestamp('user_created_at').notNull().defaultNow()
})

export const chats = pgTable('chats', {
    chatId: uuid('chat_id').defaultRandom().primaryKey(),
    chatTgId: varchar('chat_tg_id', { length: 32 }).notNull().unique(),
    chatTitle: varchar('chat_title', { length: 128 }).notNull(),
    chatUsername: varchar('chat_username', { length: 32 }),
    chatType: varchar('chat_type', { length: 12 }),
    chatMemberCount: integer('chat_member_count').default(0),
    chatIsActive: boolean('chat_is_active').notNull(),
    chatCreatedAt: timestamp('chat_created_at').notNull().defaultNow()
})
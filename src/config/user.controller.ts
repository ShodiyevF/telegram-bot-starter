import BotContext from '@customTypes/botcontext';
import { users } from '@database/schema';
import { db } from '@database/pg';
import { Bot } from 'grammy'

export function syncUsers(bot: Bot<BotContext>) {    
    bot.on('my_chat_member', async (ctx) => {
        
        const newStatus = ctx.update.my_chat_member.new_chat_member
        const oldStatus = ctx.update.my_chat_member.old_chat_member
        const chatType = ctx.update.my_chat_member.chat.type
        const chat = ctx.update.my_chat_member.from

        if (chatType == 'private') {

            let userStatus: boolean = true

            if (newStatus.status === 'kicked' && oldStatus.status === 'member') {
                userStatus = false
            } else if (newStatus.status === 'member' && oldStatus.status === 'kicked') {
                userStatus = true
            }

            await db
            .insert(users)
            .values({
                userTgId: chat.id.toString(),
                userFirstName: chat.first_name,
                userLastName: chat.last_name,
                userUsername: chat.username,
                userIsActive: userStatus
            })
            .onConflictDoUpdate({
                target: users.userTgId,
                set: {
                    userFirstName: chat.first_name,
                    userLastName: chat.last_name,
                    userUsername: chat.username,
                    userIsActive: userStatus
                }
            })
        }
        
    })
}

import { getChatMemberCount } from '@lib/bot.libs';
import BotContext from '@customTypes/botcontext';
import { chats, users } from '@database/schema';
import { db } from '@database/pg';
import { Api, Bot } from 'grammy';

export function syncUsers(bot: Bot<BotContext>, api: Api) {    
    bot.on('my_chat_member', async (ctx) => {
        const newStatus = ctx.update.my_chat_member.new_chat_member
        const oldStatus = ctx.update.my_chat_member.old_chat_member
        const chat = ctx.update.my_chat_member.chat
        
        let chatStatus: boolean = true
        if ((newStatus.status === 'kicked' || newStatus.status === 'left') && oldStatus.status === 'member') {
            chatStatus = false
        } else if (newStatus.status === 'member' && (oldStatus.status === 'kicked' || oldStatus.status === 'left')) {
            chatStatus = true
        }

        let chatMemberCount = 0        
        if (chatStatus && (chat.type == 'supergroup' || chat.type == 'channel' || chat.type == 'group')) {
            chatMemberCount = await getChatMemberCount(api, chat.id)
        }

        if (chat.type == 'private') {
            await db
            .insert(users)
            .values({
                userTgId: chat.id.toString(),
                userFirstName: chat.first_name,
                userLastName: chat.last_name,
                userUsername: chat.username,
                userIsActive: chatStatus
            })
            .onConflictDoUpdate({
                target: users.userTgId,
                set: {
                    userFirstName: chat.first_name,
                    userLastName: chat.last_name,
                    userUsername: chat.username,
                    userIsActive: chatStatus
                }
            })
        } else if (chat.type == 'supergroup') {
            await db
            .insert(chats)
            .values({
                chatTgId: chat.id.toString(),
                chatTitle: chat.title,
                chatUsername: chat.username,
                chatType: chat.type,
                chatMemberCount: chatMemberCount,
                chatIsActive: chatStatus
            })
            .onConflictDoUpdate({
                target: chats.chatTgId,
                set: {
                    chatTitle: chat.title,
                    chatUsername: chat.username,
                    chatType: chat.type,
                    chatMemberCount: chatMemberCount,
                    chatIsActive: chatStatus
                }
            })
        } else if (chat.type == 'channel') {
            await db
            .insert(chats)
            .values({
                chatTgId: chat.id.toString(),
                chatTitle: chat.title,
                chatUsername: chat.username,
                chatType: chat.type,
                chatMemberCount: chatMemberCount,
                chatIsActive: chatStatus
            })
            .onConflictDoUpdate({
                target: chats.chatTgId,
                set: {
                    chatTitle: chat.title,
                    chatUsername: chat.username,
                    chatType: chat.type,
                    chatMemberCount: chatMemberCount,
                    chatIsActive: chatStatus
                }
            })
        } else if (chat.type == 'group') {
            await db
            .insert(chats)
            .values({
                chatTgId: chat.id.toString(),
                chatTitle: chat.title,
                chatUsername: null,
                chatType: chat.type,
                chatMemberCount: chatMemberCount,
                chatIsActive: chatStatus
            })
            .onConflictDoUpdate({
                target: chats.chatTgId,
                set: {
                    chatTitle: chat.title,
                    chatUsername: null,
                    chatType: chat.type,
                    chatMemberCount: chatMemberCount,
                    chatIsActive: chatStatus
                }
            })
        }
    })
}

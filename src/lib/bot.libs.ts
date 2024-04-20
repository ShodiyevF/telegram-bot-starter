import { Api } from "grammy";

export async function getChatMemberCount(api: Api, chatId: number) {
  try {
    const response = await api.getChatMemberCount(chatId);
    return response;
  } catch (error) {
    return 0;
  }
}

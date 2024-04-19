import { Keyboard } from "grammy";
import { Scene } from "grammy-scenes";

const scene = new Scene('register');

scene.step(async (ctx) => {
    const message = `Assalamu alaykum`;
    
    const keyboard = new Keyboard().requestContact('Telefon raqamingizni jo\'nating').resized();
    await ctx.reply(message, {
        reply_markup: keyboard
    });
});

scene.wait('phone_number').on('message:contact', async (ctx) => {
    const message = `Tasdiqlash kodi bordi.`;
    
    await ctx.reply(message, {
        reply_markup: {
            remove_keyboard: true
        }
    });
    ctx.scene.resume()
});

scene.wait('send_code').on('message:text', async (ctx) => {
    const message = `Muvaffaqiyatli tizimga kirdingiz.`;
    
    await ctx.reply(message);
    scene.exit()
});

export default scene;

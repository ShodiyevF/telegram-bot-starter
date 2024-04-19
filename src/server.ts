import { ScenesSessionData, ScenesFlavor } from 'grammy-scenes';
import { Bot, Context, SessionFlavor, session } from 'grammy';
import dotenv from 'dotenv';

import scenes from '@scene/scenes';
import { starterScene } from '@scene/starter.scene';

dotenv.config();

function initializer() {
    
    const botToken = process.env.BOT_TOKEN ? process.env.BOT_TOKEN : 'not_found'
    
    type BotContext = Context & SessionFlavor<ScenesSessionData> & ScenesFlavor;
    const bot = new Bot<BotContext>(botToken);

    function initializeMiddlewares():void {
        bot.use(
            session({ 
                initial: () => ({})
            })
        );
        
        bot.use(scenes.manager());
        bot.use(scenes);
    }
    
    function initializeScenes():void {
        starterScene(bot)
    }

    function startBot():void {
        bot.start();
        console.log('SUCCESSFULLY ✅');
    }

    function runner():void {
        initializeMiddlewares();
        initializeScenes();
        startBot();
    }

    runner();

}

initializer();
import { Api, Bot, session } from 'grammy';
import dotenv from 'dotenv';

import { starterScene } from '@scene/starter.scene';
import { syncUsers } from '@config/user.controller';
import BotContext from '@customTypes/botcontext';
import scenes from '@scene/scenes';

dotenv.config();

function initializer() {
    
    const botToken = process.env.BOT_TOKEN ? process.env.BOT_TOKEN : 'not_found'
    
    const bot = new Bot<BotContext>(botToken);
    const api = new Api(botToken);

    function initializeMiddlewares():void {
        bot.use(
            session({ 
                initial: () => ({})
            })
        );
        
        bot.use(scenes.manager());
        bot.use(scenes);
    }

    function libs():void {
        syncUsers(bot, api)
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
        libs();
        startBot();
    }

    runner();

}

initializer();
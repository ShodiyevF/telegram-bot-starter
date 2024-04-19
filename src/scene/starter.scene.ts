export function starterScene(bot: any) {
    bot.command('start', (msg: any) => {
        msg.scenes.enter('register')
    }) 
}
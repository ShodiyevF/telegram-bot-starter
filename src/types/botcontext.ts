import { Context, SessionFlavor } from 'grammy';
import { ScenesSessionData, ScenesFlavor } from 'grammy-scenes';

type BotContext = Context & SessionFlavor<ScenesSessionData> & ScenesFlavor;

export default BotContext
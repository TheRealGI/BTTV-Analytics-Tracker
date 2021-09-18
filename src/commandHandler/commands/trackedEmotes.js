const contextHelper = require('../../util/contextHelper');
const emoteService = require('../../service/emote-service');

module.exports = {
  name: 'trackedemotes',
  needsArgs: false,
  async execute(client, channel, context, message) {
    //only broadcaster/mods can display all tracked emotes
    if(!contextHelper.isModUp(context)) {
      return;
    }

    let allTrackedEmotes = await emoteService.getAllTrackedEmotes();
    let displayName = contextHelper.getDisplayName(context);
    if(allTrackedEmotes.length > 0) {
        let responseText = "";
        allTrackedEmotes.map(emote => {
            responseText+= `${emote} `;
        })
        client.say(channel, `@${displayName} --> ${responseText}`);
        return;
    }

    client.say(channel, `@${displayName} --> There are no BTTV emotes tracked at the moment`);
 }
}
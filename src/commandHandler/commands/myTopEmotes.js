const contextHelper = require('../../util/contextHelper');
const dataService = require('../../service/data-service');
module.exports = {
  name: 'mytopemotes',
  needsArgs: false,
  timeout: 120,
  async execute(client, channel, context) {
      let displayName = contextHelper.getDisplayName(context);
      let topEmotes = await dataService.getTopEmotesByUserId(contextHelper.getUserId(context));
      if(topEmotes.length > 0) {
          let responseText = "";
          topEmotes.map(emote => {
              responseText+=`${emote.EmoteId}  ${emote.Count} `;
          });
        
          client.say(channel, `@${displayName}, ${responseText}`);
          return true;
      }

      client.say(channel, `@${displayName} You better start to use some BTTV emotes.`);
      return true;
 }
}
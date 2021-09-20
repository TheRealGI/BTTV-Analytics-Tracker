const contextHelper = require('../../util/contextHelper');
const dataService = require('../../service/data-service');
module.exports = {
  name: 'channeltopemotes',
  needsArgs: false,
  timeout: 120,
  async execute(client, channel, context, message) {
      // this command is broadcaster only
      if(contextHelper.isBroadcaster(context)) {
        let displayName = contextHelper.getDisplayName(context);
        let topChannelEmotes = await dataService.getAllEmotesByRank();

        if(topChannelEmotes.length > 0) {
          let responseText = "";
          topChannelEmotes.map(emote => {
              responseText+=`${emote.EmoteId}  ${emote.Count} `;
          });
        
          client.say(channel, `@${displayName}, ${responseText}`);
          return true;
      }
      client.say(channel, `@${displayName} Is your community dead or why has no one used a BTTV emote?`);
      return true;
      }
      return false;
 }
}
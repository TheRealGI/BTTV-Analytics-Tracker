const contextHelper = require('../../util/contextHelper');
const emoteService = require('../../service/emote-service');
const EmoteType = require('../../db/model/emoteType');
const emoteType = new EmoteType();

module.exports = {
  name: 'removeemote',
  needsArgs: true,
  timeout: 10,
  async execute(client, channel, context, message, args) {
    //only mods or broadcaster can remove emotes from tracking
    if(!contextHelper.isModUp(context)) {
      return false;
    }

    if(args && args.length > 0) {
      var emote = await emoteService.removeEmoteIfExists(args[0], emoteType.CUSTOM)
      if(emote) {
        client.say(channel, `The emote: ${args[0]} was successfully removed`);
        return true;
      }
    }
    return false;
 }
}
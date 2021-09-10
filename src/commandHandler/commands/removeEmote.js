const contextHelper = require('../../util/contextHelper');
const emoteService = require('../../service/emote-service');

module.exports = {
  name: 'removeemote',
  needsArgs: true,
  async execute(client, channel, context, message, args) {
    //only mods or broadcaster can remove emotes from tracking
    if(!contextHelper.isModUp(context)) {
      return;
    }

    if(args && args.length > 0) {
      var emote = await emoteService.removeEmoteIfExists(args[0])
      if(emote) {
        client.say(channel, `The emote: ${args[0]} was successfully removed`);
      }
    }
    return;
 }
}
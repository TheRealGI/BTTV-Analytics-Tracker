const contextHelper = require('../../util/contextHelper');
const emoteService = require('../../service/emote-service');

module.exports = {
  name: 'addemote',
  needsArgs: true,
  timeout: 10, 
  async execute(client, channel, context, message, args) {
    //only mods or broadcaster can add emotes for tracking
    if(!contextHelper.isModUp(context)) {
      return false;
    }

    if(args && args.length > 0) {
      var emote = await emoteService.addEmoteIfNotExists(args[0])
      if(emote) {
        client.say(channel, `The emote: ${args[0]} was successfully added`);
        return true;
      }
    }
    return false;
 }
}
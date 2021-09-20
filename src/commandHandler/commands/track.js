const contextHelper = require('../../util/contextHelper');
const userService = require('../../service/user-service');

module.exports = {
  name: 'track',
  needsArgs: false,
  timeout: 5,
  async execute(client, channel, context, message) {
    let displayName = contextHelper.getDisplayName(context);
    let userId = contextHelper.getUserId(context);
    let user = await userService.addOrTrackUserIfNotExists({userId: userId, displayName: displayName, isTracked: 1});
    
    if(user == null) {
      client.say(channel, `@${displayName} tracking BTTV usage already`);
      return true;
    }

    if(user) {
      client.say(channel, `@${displayName} tracking BTTV usage now`);
      return true;
  }
  return false;
 }
}
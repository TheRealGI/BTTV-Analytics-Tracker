const contextHelper = require('../../util/contextHelper');
const userService = require('../../service/user-service');

module.exports = {
  name: 'untrack',
  needsArgs: false,
  timeout: 5,
  async execute(client, channel, context, message) {
    let userId = contextHelper.getUserId(context);
    let user = await userService.untrackUserByUserId(userId);

    if(user == null) {
      return false;
    }

    let userName = contextHelper.getDisplayName(context);
    if(user) {
      client.say(channel, `@${userName} you will be no longer tracked`);
      return true;
    }
    return false;
 }
}
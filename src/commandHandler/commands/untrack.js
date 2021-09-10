const contextHelper = require('../../util/contextHelper');
const userService = require('../../service/user-service');

module.exports = {
  name: 'untrack',
  needsArgs: false,
  async execute(client, channel, context, message) {
    let userId = contextHelper.getUserId(context);
    let user = await userService.untrackUserByUserId(userId);

    if(user == null) {
      return;
    }

    let userName = contextHelper.getDisplayName(context);
    if(user) {
      client.say(channel, `@${userName} bttv usage will be no longer tracked`)
    }
 }
}
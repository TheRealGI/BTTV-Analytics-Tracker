const contextHelper = require('../../util/contextHelper');
const importService = require('../../service/import-service');

module.exports = {
  name: 'refresh',
  needsArgs: false,
  timeout:30,
  async execute(client, channel, context, message) {
      let displayName = contextHelper.getDisplayName(context);
      // this command is broadcaster only
      if(contextHelper.isBroadcaster(context)) {

        let response = await importService.importEmotes(channel, displayName);
        client.say(channel, response);
      }
  }
}


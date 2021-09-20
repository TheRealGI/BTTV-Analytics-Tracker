const contextHelper = require('../../util/contextHelper');
const dataService = require('../../service/data-service');

module.exports = {
  name: 'reset',
  needsArgs: false,
  timeout: 60,
  async execute(client, channel, context, message) {
    //only broadcaster can delete all tracked data on the channel
    if(!contextHelper.isBroadcaster(context)) {
      return false;
    }

    let success = await dataService.deleteAllTrackedData();
    let displayName = contextHelper.getDisplayName(context);
    if(success) {
        client.say(channel, `@${displayName}, All tracked data from this channel was successfully deleted.`);
        return true;
    }
    client.say(channel, `@${displayName} could not delete all data. Try again later`);
    return true;
 }
}
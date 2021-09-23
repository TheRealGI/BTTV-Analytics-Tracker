const contextHelper = require('../../util/contextHelper');
const configService = require('../../service/config-service');

module.exports = {
  name: 'setffzuserid',
  needsArgs: true,
  timeout: 10,
  async execute(client, channel, context, message, args) {
      let displayName = contextHelper.getDisplayName(context);
      // this command is broadcaster only
      if(contextHelper.isBroadcaster(context)) {
        //does set the bttvUserId for the import
        if(args.length > 0) {
           let success = await configService.addOrUpdateConfig(channel, 'FFZUserId', args[0].toLowerCase());
           if(success) {
             client.say(channel, `@${displayName} --> UserId for FFZ Import was set to: ${args[0]}`);
             return true;
           }
           client.say(channel, `@${displayName} there was a unknown error... please try again later`);
          return true;
        }
        return false;
      }
    }
}
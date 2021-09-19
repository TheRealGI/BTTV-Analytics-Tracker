const contextHelper = require('../../util/contextHelper');
const bttvService = require('../../service/bttv-service');
const configService = require('../../service/config-service');

module.exports = {
  name: 'refresh',
  needsArgs: true,
  async execute(client, channel, context, message, args) {
      let displayName = contextHelper.getDisplayName(context);
      // this command is broadcaster only
      if(contextHelper.isBroadcaster(context)) {
        //does set the bttvUserId for the import
        if(args.length > 0) {
           let success = await configService.addOrUpdateConfig(channel, 'BTTVUserId', args[0]);
           if(success) {
             client.say(channel, `@${displayName} --> UserId for BTTV Import was set to: ${args[0]}`);
             return;
           }
           client.say(channel, `@${displayName} there was a unknown errro... please try again later`);
          return;
        }

        let response = await bttvService.importBTTVEmotes(channel, 'BTTVUserId');
        if(response && response['userIdNotSet']) {
          return  client.say(channel, `@${displayName} --> Missing UserId for BTTV import. Please use !refresh [BttvUserId] to use this command`);
        }
        let addedCount = response['added'];
        let removedCount = response['removed'];

        if(response && addedCount == 0 && removedCount == 0) {
          client.say(channel, `@${displayName} --> Everything is up to date`);
          return;
        }
        
        if(response) {
          client.say(channel, `@${displayName} --> Added ${addedCount} emotes and removed ${removedCount} emotes`);
        }
      }
  }
}
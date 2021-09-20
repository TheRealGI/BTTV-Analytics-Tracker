const rateLimitCache = require('../db/cache/rateLimit.cache')

module.exports = {
    handleCommand(client, channel, context, msg, command, commandCollection, args) {
        if (!commandCollection[command]) return;
        try {
          //check if rate limit is exceeded to prevent bot being blocked out for 30 minutes!
          if(rateLimitCache.hasKey(command) || rateLimitCache.get('messageSend') > 19) {
            return;
          }
          var messageSend;
          var commandToExecute = commandCollection[command];
          if(commandToExecute.needsArgs) {
            messageSend = commandToExecute.execute(client, channel, context, msg, args)
          } else {
            messageSend = commandToExecute.execute(client, channel, context, msg);
          }

          //update caches
          if(messageSend) {
            rateLimitCache.setRateLimits(commandToExecute.name, commandToExecute.name, commandToExecute.timeout);
          }
        } catch (error) {
            return;
        }
    }
}
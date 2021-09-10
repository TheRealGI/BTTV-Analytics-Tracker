module.exports = {
    handleCommand(client, channel, context, msg, command, commandCollection, args) {
        if (!commandCollection[command]) return;
        try {
          if(commandCollection[command].needsArgs) {
            commandCollection[command].execute(client, channel, context, msg, args)
          } else {
            commandCollection[command].execute(client, channel, context, msg);
          }
        } catch (error) {
            return;
        }
    }
}
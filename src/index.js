const tmi = require('tmi.js');
const fs = require('fs');
const commandHandler = require('./commandHandler/commandHandler');
const contextHelper = require('./util/contextHelper');
const messageParser = require('./messageParser/messageParser');
const userService = require('./service/user-service');
const emoteService = require('./service/emote-service');
require('dotenv').config()

// Commandlist
const commandCollection = {};
const commandFiles = fs.readdirSync('./src/commandHandler/commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
  const command = require(`./commandHandler/commands/${file}`);
  commandCollection[command.name] = command;
}

 populateCaches();

// Define configuration options
const opts = {
  identity: {
    username: process.env['BOT_USERNAME'],
    password: process.env['OAUTH_TOKEN']
  },
  channels: [
    process.env['CHANNEL_NAME']
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (channel, context, msg, self) {
  // Ignore messages from the bot
  if (self) { return; } 
  // check if the message is a command
  if(msg.startsWith(process.env['PREFIX'])) {
    const args = msg.slice(process.env.PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    commandHandler.handleCommand(client, channel, context, msg, command, commandCollection, args);
    return;
  }
  
  //usage of bttv emotes will be only tracked if the flag is set for the user
  messageParser.parseBttvEmoteFromMessage(contextHelper.getUserId(context), msg);
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

async function populateCaches () {
  await userService.getAllTrackedUsers();
  await emoteService.getAllEmotes();
}
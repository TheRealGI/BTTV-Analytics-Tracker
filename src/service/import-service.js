const got = require('got')
const emoteCache = require('../db/cache/emote.cache'); 
const emoteService = require('./emote-service');
const configService = require('./config-service');
const EmoteType =  require('../db/model/emoteType');
const emoteType = new EmoteType();

async function importEmotes(channel, displayName) {
    let messagePrefix = `@${displayName} -->`;
    let bttvUserId = await configService.getConfigByChannelAndAttributeName(channel,'BTTVUserId');
    let ffzUserId = await configService.getConfigByChannelAndAttributeName(channel,'FFZUserId');

    if(bttvUserId.length == 0 && ffzUserId.length == 0) {
        return messagePrefix + 
        "No id's set for the import. To import from BTTV use !setBttvUserId [bttvUserId].To import from FFZ use !setFFZUserId [ffzUserid]. Setting both id's will import from both sources.";
    }
    let bttvMessage = "";
    if(bttvUserId.length > 0) {
        bttvMessage = await importBttv(bttvUserId[0]);
    }

    let ffzMessage = "";
    if(ffzUserId.length > 0) {
         ffzMessage = await importFfz(ffzUserId[0]);
    }

    
    return messagePrefix + bttvMessage + ffzMessage;
}

async function importBttv(id) {
    let addedEmotes = [];
    let removedEmotes = [];
    let allBTTVEmotes = [];
    let successRemoved = [];
    let successAdded = [];
    return await got(`https://api.betterttv.net/3/users/${id.Value}?limited=true&personal=false`, {json: true})
    .then( result => {
      result.body.channelEmotes.map( channelEmote => {
        allBTTVEmotes.push(channelEmote.code);
      });

      result.body.sharedEmotes.map( sharedEmote => {
        allBTTVEmotes.push(sharedEmote.code);
      });

       removedEmotes = checkForRemovedEmotes(allBTTVEmotes, emoteType.BTTV);
       addedEmotes= checkForAddedEmotes(allBTTVEmotes,  emoteType.BTTV);

       successRemoved = removeEmotes(removedEmotes, emoteType.BTTV);
         successAdded = addEmotes(addedEmotes, emoteType.BTTV);

       return `BTTV: Added ${successAdded.length} and removed ${successRemoved.length} emotes.`;
    });
}

async function importFfz(id) {
    let addedEmotes = [];
    let removedEmotes = [];
    let allBTTVEmotes = [];
    let successRemoved = [];
    let successAdded = [];
    return await got(`https://api.frankerfacez.com/v1/room/${id.Value}`, {json: true})
    .then( result => {
        result.body.sets[result.body.room.set].emoticons.map( channelEmote => {
        allBTTVEmotes.push(channelEmote.name);
      });
            removedEmotes = checkForRemovedEmotes(allBTTVEmotes, emoteType.FFZ);
            addedEmotes= checkForAddedEmotes(allBTTVEmotes, emoteType.FFZ);

            successRemoved = removeEmotes(removedEmotes, emoteType.FFZ);
            successAdded = addEmotes(addedEmotes, emoteType.FFZ);
       
       return ` FFZ: Added ${successAdded.length} and removed ${successRemoved.length} emotes.`;

    });
}


function addEmotes(addedEmotes, type) {
    let successAdded = [];
    if(addedEmotes && addedEmotes.length > 0) {
        addedEmotes.map( addedEmote => {
            let success = emoteService.addEmoteIfNotExists(addedEmote, type);
            if(success) {
                successAdded.push(addedEmote);
            }
        });
    }
    return successAdded;
}

function removeEmotes (removedEmotes, type) {
    let successRemoved = [];
    if(removedEmotes && removedEmotes.length > 0) {
        removedEmotes.map( removeEmote => {
            let success =  emoteService.removeEmoteIfExists(removeEmote, type);
            if(success) {
                successRemoved.push(removeEmote);
            }
        });
    }
    return successRemoved;
}


function checkForRemovedEmotes (allEmotes, type) {
    let emotesToRemove = [];
    let existingKeys = emoteCache.getAllKeysByType(type);

   existingKeys.map( key => {
       if (!allEmotes.includes(key)) {
           emotesToRemove.push(key);
       }
   });

   return emotesToRemove;
}

function checkForAddedEmotes (allEmotes, type) {
    let emotesToAdd = [];
    let existingKeys = emoteCache.getAllKeysByType(type);

    allEmotes.map( bttvEmote => {
      if (!existingKeys.includes(bttvEmote)) {
       emotesToAdd.push(bttvEmote);
      }
  });

  return emotesToAdd;
}
 module.exports = {importEmotes}
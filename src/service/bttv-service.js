const got = require('got')
const emoteCache = require('../db/cache/emote.cache'); 
const emoteService = require('../service/emote-service');
const configService = require('../service/config-service');

async function importBTTVEmotes(channel, attributeName) {
    let addedEmotes = [];
    let removedEmotes = [];
    let allBTTVEmotes = [];
    let successRemoved = [];
    let successAdded = [];

    let bttvUserId = await configService.getConfigByChannelAndAttributeName(channel,attributeName);
    if(bttvUserId.length == 0) {
        return {'userIdNotSet': true};
    }
    let response = await got(`https://api.betterttv.net/3/users/${bttvUserId[0].Value}?limited=true&personal=false`, {json: true})
    .then( result => {
      result.body.channelEmotes.map( channelEmote => {
        allBTTVEmotes.push(channelEmote.code);
      });

      result.body.sharedEmotes.map( sharedEmote => {
        allBTTVEmotes.push(sharedEmote.code);
      });

       removedEmotes = checkForRemovedEmotes(allBTTVEmotes);
       addedEmotes= checkForAddedEmotes(allBTTVEmotes);

       successRemoved = removeEmotes(removedEmotes);
       successAdded = addEmotes(addedEmotes);

       return {'removed': successRemoved.length, 'added': successAdded.length};

    });

    return response;
}


function addEmotes(addedEmotes) {
    let successAdded = [];
    if(addedEmotes && addedEmotes.length > 0) {
        addedEmotes.map( addedEmote => {
            let success =  emoteService.addEmoteIfNotExists(addedEmote);
            if(success) {
                successAdded.push(addedEmote);
            }
        });
    }
    return successAdded;
}

function removeEmotes (removedEmotes) {
    let successRemoved = [];
    if(removedEmotes && removedEmotes.length > 0) {
        removedEmotes.map( removeEmote => {
            let success =  emoteService.removeEmoteIfExists(removeEmote);
            if(success) {
                successRemoved.push(removeEmote);
            }
        });
    }
    return successRemoved;
}


 function checkForRemovedEmotes (allBTTVEmotes) {
     let emotesToRemove = [];
    let existingKeys = emoteCache.getAllKeys();

    existingKeys.map( key => {
        if (!allBTTVEmotes.includes(key)) {
            emotesToRemove.push(key);
        }
    });

    return emotesToRemove;
 }

 function checkForAddedEmotes (allBTTVEmotes) {
    let emotesToAdd = [];
   let existingKeys = emoteCache.getAllKeys();

   allBTTVEmotes.map( bttvEmote => {
       if (!existingKeys.includes(bttvEmote)) {
        emotesToAdd.push(bttvEmote);
       }
   });

   return emotesToAdd;
}

module.exports = {importBTTVEmotes};
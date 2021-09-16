const userService = require('../service/user-service');
const emoteService = require('../service/emote-service');
const trackedEmotes = {};

const parseBttvEmoteFromMessage = (userId, message) => {
    if(userService.isUserBeingTracked(userId)) {
        let wordsToScan = message.split(' ');
        wordsToScan.foreach( word => {
            if( emoteService.containsEmote(word)) {
                updateTrackedEmotes(word)
            }
        });
        if(trackedEmotes.length > 0) {
            saveTrackedData(trackedEmotes);
        }
    }
    
    trackedEmotes = {};
    return;
}

function updateTrackedEmotes(emote) {
    let exists = trackedEmotes[emote];
    if(!!exists) {
        trackedEmotes[emote] = exists + 1;
        return;
    }
    trackedEmotes[emote] = 1;
}

function saveTrackedData() {
    //TODO
}

module.exports = {parseBttvEmoteFromMessage,}
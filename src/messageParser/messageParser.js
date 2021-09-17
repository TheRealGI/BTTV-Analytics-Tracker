const userService = require('../service/user-service');
const emoteService = require('../service/emote-service');
const dataService = require('../service/data-service');

async function parseBttvEmoteFromMessage (userId, message) {
    var trackedEmotes = [];
    if(userService.isUserBeingTracked(userId)) {
        var wordsToScan = message.split(' ');
        var currentPos = 0;

        while(wordsToScan.length > currentPos) {
            let word = wordsToScan[currentPos];

            if(emoteService.containsEmote(word)) {
                var wordsFiltered = wordsToScan.filter( x => x == word);
                wordsToScan = wordsToScan.filter(function(word) { return wordsFiltered.indexOf(word) == -1; });
              trackedEmotes[word] = wordsFiltered.length;
              continue;
           }
           currentPos ++;
        }

        if(Object.keys(trackedEmotes).length > 0) {
            await saveTrackedData(trackedEmotes, userId);
        }
    }
}

async function saveTrackedData(trackedEmotes, userId) {
    for (var key in trackedEmotes) {
        dataService.saveData(userId, key, trackedEmotes[key])
    }
}

module.exports = {parseBttvEmoteFromMessage,}
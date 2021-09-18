const emoteRepository = require('../db/repository/emote-repository');
const emoteCache = require('../db/cache/emote.cache');

const addEmoteIfNotExists = async function (value) {
  var emote = await emoteRepository.getEmoteByValue(value);
  if(emote && emote.length > 0) {
    return;
  }
  var success = emoteRepository.addEmote({Value: value});
  if (success) {
    emoteCache.set(value, value);
  }
  return success;
}

const removeEmoteIfExists = async function(value) {
  var emote = await emoteRepository.getEmoteByValue(value);
  if(emote && emote.length > 0) {
    var success = emoteRepository.removeEmote(value);
    if(success) {
      emoteCache.delete(value);
    }
    return success;
  }
  return;
}

const containsEmote = function(word) {
  return emoteCache.hasKey(word);
}

const getAllEmotes = async function() {
  let allEmotes = [];
  await emoteRepository.getAllEmotes().then( result => {
    result.map(res => allEmotes.push({key: res.Value, val: res.Id}))
  });
  emoteCache.setMulti(allEmotes);
}

const getAllTrackedEmotes = async function() {
  var allEmotes = [];
  await emoteRepository.getAllEmotes().then(result => {
    result.map( emote => {
      allEmotes.push(emote.Value);
    });
  });
  return allEmotes;
}

module.exports = {addEmoteIfNotExists, removeEmoteIfExists, containsEmote, getAllEmotes, getAllTrackedEmotes};
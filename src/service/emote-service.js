const emoteRepository = require('../db/repository/emote-repository');
const emoteCache = require('../db/cache/emote.cache');

const addEmoteIfNotExists = async function (value, type) {
  var emote = await emoteRepository.getEmoteByValueAndType(value, type);
  if(emote && emote.length > 0) {
    return;
  }
  var success = emoteRepository.addEmote({Value: value, Type: type});
  if (success) {
    emoteCache.set(value, {value: value, type: type});
  }
  return success;
}

const removeEmoteIfExists = async function(value, type) {
  var emote = await emoteRepository.getEmoteByValueAndType(value, type);
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
    result.map(res => allEmotes.push({key: res.Value, val: {value: res.Value, type: res.Type}}))
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
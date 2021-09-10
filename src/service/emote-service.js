const emoteRepository = require('../db/repository/emote-repository');

const addEmoteIfNotExists = async function (value) {
  var emote = await emoteRepository.getEmoteByValue(value);
  if(emote && emote.length > 0) {
    return;
  }

  return await emoteRepository.addEmote({Value: value});
}

const removeEmoteIfExists = async function(value) {
  var emote = await emoteRepository.getEmoteByValue(value);
  if(emote && emote.length > 0) {
    return await emoteRepository.removeEmote(value);
  }
  return;
}

module.exports = {addEmoteIfNotExists, removeEmoteIfExists};
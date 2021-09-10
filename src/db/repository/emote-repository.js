const db = require('../knex');

function getEmoteByValue(value) {
  return db.dbConnection("Emotes").select("*")
  .where("Value", value);
}

function addEmote(value) {
  return db.dbConnection("Emotes").insert(value)
  .then( () => {
      return true;
    }).catch( () => {
      return false;
    });
}

function removeEmote(value) {
  return db.dbConnection("Emotes").where("Value", value).del()
  .then( () => {
      return true;
    }).catch( () => {
      return false;
    });
}

module.exports = {getEmoteByValue, addEmote, removeEmote};
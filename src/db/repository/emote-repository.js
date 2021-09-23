const db = require('../knex');

function getEmoteByValueAndType(value, type) {
  return db.dbConnection("Emotes").select("*")
  .where("Value", value)
  .andWhere("Type", type);
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

function getAllEmotes() {
  return db.dbConnection("Emotes").select("*");
}

module.exports = {getEmoteByValueAndType, addEmote, removeEmote, getAllEmotes};
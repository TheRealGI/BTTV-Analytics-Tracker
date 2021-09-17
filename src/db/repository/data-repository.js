const db = require('../knex');

function addData(userId, emoteId, count) {
    return db.dbConnection("Data").insert({UserId: userId, EmoteId: emoteId, Count: count}).then( () => {
        return true;
    }).catch(() => {
        return false;
    });
  }

  function updateData(userId, emoteId, count) {
    return db.dbConnection("Data").where("UserId", userId).andWhere("EmoteId", emoteId).increment({"Count": count}).then( () => {
        return true;
    }).catch( () => {
        return false;
    });
  }

  function getDataByUserIdAndEmoteId(userId, emoteId) {
      return db.dbConnection("Data").select("*").where("UserId", userId).andWhere("EmoteId",emoteId)
  }

  function getTopThreeEmotesByUserIdAnEmoteId(userId) {
      return db.dbConnection("Data").select("EmoteId").where("UserId", userId).orderBy("Count", "desc").limit(3);
  }

  module.exports = {addData, updateData, getDataByUserIdAndEmoteId}, getTopThreeEmotesByUserIdAnEmoteId
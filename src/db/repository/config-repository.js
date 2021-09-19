const db = require('../knex');

function addConfig(channelId, attributeName, value) {
    return db.dbConnection("Config").insert({ChannelId: channelId, AttributeName: attributeName, Value: value}).then( () => {
        return true;
    }).catch(() => {
        return false;
    });
  }

  function updateConfig(channelId, attibuteName, value) {
    return db.dbConnection("Config").where("ChannelId", channelId).andWhere("AttributeName", attibuteName).update({"Value": value}).then( () => {
        return true;
    }).catch( () => {
        return false;
    });
  }

  function getConfigByChannelIdAndAttributeName(channelId, attibuteName) {
    return db.dbConnection("Config").select("Value").where("ChannelId", channelId).andWhere("AttributeName", attibuteName);
  }

  module.exports = {addConfig, updateConfig, getConfigByChannelIdAndAttributeName}
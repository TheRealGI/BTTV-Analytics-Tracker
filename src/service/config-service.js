const configRepository = require('../db/repository/config-repository');

async function addOrUpdateConfig(channelId, attributeName, value) {
    let exists = await configRepository.getConfigByChannelIdAndAttributeName(channelId, attributeName)
    if(exists.length > 0) {
        return await configRepository.updateConfig(channelId, attributeName, value);
    }
    return  await configRepository.addConfig(channelId, attributeName, value);
}

async function getConfigByChannelAndAttributeName(channelId, attributeName) {
    return await configRepository.getConfigByChannelIdAndAttributeName(channelId, attributeName);
}
  module.exports = {addOrUpdateConfig, getConfigByChannelAndAttributeName};
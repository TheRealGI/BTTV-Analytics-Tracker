const isMod = function (context) {
    return context.mod;
}

const isBroadcaster = function (context) {
    return context.badges !== undefined && context.badges.broadcaster;
}

const isModUp = function (context) {
    return isMod(context) || isBroadcaster(context);
}

const getDisplayName = function (context) {
  return context['display-name'];
}

const getUserId = function (context) {
  return context['user-id'];
}

module.exports = { isMod, isBroadcaster, isModUp, getDisplayName, getUserId };
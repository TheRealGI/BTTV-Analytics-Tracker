const userRepository = require('../db/repository/user-repository');
const userCache = require('../db/cache/user.cache');

const addOrTrackUserIfNotExists = async function(userDto) {
    var user = await userRepository.getUserByUserId(userDto.userId);
    if(!user || user.length < 1){
        user = await userRepository.addUser(userDto);
        userCache.set(userDto.userId);
        return user;
    }

    if(!user[0].IsTracked){
      user = await userRepository.trackUser(userDto.userId);
      userCache.set(userDto.userId);
      return user; 
    }
    
    return null;

}

const untrackUserByUserId = async function (userId) {
    var user = await userRepository.getUserByUserId(userId);
    if(!user || user.length < 1 || !user[0].IsTracked){
        return null;
    }
    
    let success = await userRepository.untrackUser(userId);
    if(success) {
        userCache.delete(userId);
    }
    return success;
}

const isUserBeingTracked = async function (userId) {
    return userCache.hasKey(userId);
}

const getAllTrackedUsers = async function () {
    var allUsers = []
     await userRepository.getAllTrackedUsers().then(result => {
         result.map( res => allUsers.push({key: res.UserId,val: res.DisplayName}));
     });
    userCache.setMulti(allUsers);
}

module.exports = {addOrTrackUserIfNotExists, untrackUserByUserId, isUserBeingTracked, getAllTrackedUsers};

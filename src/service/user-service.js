const userRepository = require('../db/repository/user-repository');

const addOrTrackUserIfNotExists = async function(userDto) {
    var user = await userRepository.getUserByUserId(userDto.userId);
    if(!user || user.length < 1){
        user = await userRepository.addUser(userDto);
        return user;
    }

    if(!user[0].IsTracked){
      user = await userRepository.trackUser(userDto.userId);
      return user; 
    }
    
    return null;

}

const untrackUserByUserId = async function (userId) {
    var user = await userRepository.getUserByUserId(userId);
    if(!user || user.length < 1 || !user[0].IsTracked){
        return null;
    }
    
    return await userRepository.untrackUser(userId);
}

module.exports = {addOrTrackUserIfNotExists, untrackUserByUserId};

const db = require('../knex');

function getUserByUserId(userId) {
    return db.dbConnection("User").select("*")
    .where("UserId", userId);
}

function addUser(userEntity) {
    return db.dbConnection("User").insert(userEntity);
}

function trackUser(userId) {
        return db.dbConnection("User").where("UserId", userId).update({IsTracked: 1}).then( () => {
        return true;
    }).catch( () => {
        return false;
    });
}

function untrackUser(userId) {
        return db.dbConnection("User").where("UserId", userId).update({IsTracked: 0}).then( () => {
        return true;
    }).catch( () => {
        return false;
    });
}

function getAllTrackedUsers() {
    return db.dbConnection("User").select("*").where("IsTracked", 1);
}

module.exports = {getUserByUserId, addUser, trackUser, untrackUser, getAllTrackedUsers};
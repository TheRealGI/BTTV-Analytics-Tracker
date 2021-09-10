class UserEntity {
    userId;
    isTracked;
    displayName;

    constructor (userId, displayName, isTracked = 1) {
        this.userId = userId;
        this.isTracked = isTracked;
        this.displayName = displayName
    }
}

module.exports = UserEntity;
class DataEntity {
    id;
    userId;
    emoteId;
    count;

    constructor (id,emoteId, userId, count) {
        this.id = id;
        this.userId = userId;
        this.emoteId = emoteId;
        this.count = count;
    }
}

module.exports = DataEntity;
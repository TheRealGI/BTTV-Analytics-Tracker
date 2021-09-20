const NodeCache = require('node-cache');
const messageLimitKey = 'messageSend'

module.exports = {
    cache: new NodeCache(),
    set: function (key, value) { this.cache.set(key, value)},
    set: function (key, value, lifespan) { this.cache.set(key, value, lifespan)},
    setRateLimits: function (key, value, lifespan) {
        this.set(key,value, lifespan)
        if(this.hasKey(messageLimitKey)) {
            let value = this.get(messageLimitKey);
            let ttl = this.getTtl(messageLimitKey);
            let now =  + new Date();
            let newTtl = (ttl - now) / 1000
            value++;
            this.set(messageLimitKey, value, newTtl);
            return;
        }
        this.set(messageLimitKey, 1, 30);
    },
    get: function (key) { return this.cache.get(key)},
    hasKey: function (key) {return this.cache.has(key)},
    getTtl: function (key) {return this.cache.getTtl(key)}
}
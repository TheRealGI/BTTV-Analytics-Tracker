const NodeCache = require("node-cache");

module.exports = {
    cache: new NodeCache(),
    set: function (key, value) { this.cache.set(key, value)},
    setMulti: function (keyValues) { this.cache.mset(keyValues) },
    get: function (key) { return this.cache.get(key)},
    getMulti: function (keys) { return this.cache.mget(keys)},
    hasKey: function (key) {return this.cache.has(key)},
    delete: function (key) {this.cache.del(key)},
    getAllKeys: function() {return this.cache.keys()},
    getAllKeysByType: function (type) {
        let keys =this.getAllKeys();
        let entries = this.getMulti(keys);
        return  Object.values(entries).filter(value => value.type == type).map( filtered => {return filtered.value});}
}
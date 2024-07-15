const redis = require('redis');
const redisClient = redis.createClient();

redisClient.on('connect', function() {
    console.log('Redis client connected');
});

redisClient.on('error', function (err) {
    console.error('Something went wrong ' + err);
});

module.exports = redisClient;

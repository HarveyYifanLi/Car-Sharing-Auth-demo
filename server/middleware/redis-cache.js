const redis = require('redis');

const REDIS_PORT = process.env.REDIS_PORT || 6379;

const redisClient = redis.createClient({
    legacyMode: true,
    // PORT: REDIS_PORT, // use this locally
    // url: 'redis://my-redis-container:6379', // i.e. 'my-redis-container' is the name of the Redis (client) Container created and running in the Docker network
    url: 'redis://redis-service:80', // i.e. 'redis-service' is the kubernetes Service resource/entry-point (which gets requests at port:80) created for redis Deployment resource
  });

(async () => { 
    await redisClient.connect(); 
})();

exports.checkCache = async function(req, res, next) {

    redisClient.get("allPublicCars", (error, data) => {
        if(error) next(error);

        if(data) {
            console.log('hit cache, with data', data);
            res.status(200).json(JSON.parse(data));
        } else {
            console.log('hit cache, no data');
            next();
        }
    });
}

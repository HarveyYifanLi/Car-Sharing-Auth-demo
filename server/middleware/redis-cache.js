const redis = require('redis');

const REDIS_PORT = process.env.REDIS_PORT || 6379;

const redisClient = redis.createClient({
    legacyMode: true,
    PORT: REDIS_PORT,
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

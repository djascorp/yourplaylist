const redis = require('redis');


console.log("DOTENV",process.env.REDIS_URL);

// Créez un client Redis
const redisClient = redis.createClient({
    url: process.env.REDIS_URL // URL de connexion Redis
});

// Gestion des erreurs de connexion
redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

// Connectez-vous à Redis
redisClient.connect();

module.exports = redisClient;
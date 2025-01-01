// redis.js
const Redis = require('ioredis');
const dotenv = require('dotenv')
dotenv.config()
// Configure Redis connection
const redis = new Redis({
  host: process.env.REDIS_HOST, // Redis server host
  port: process.env.REDIS_PORT,        // Redis server port
  password: process.env.REDIS_PASSWORD,      // Use password if required
  tls:{}
});

redis.on('connect', () => {
  console.log('Connected to Redis');
});

redis.on('error', (err) => {
  console.error('Redis connection error:', err);
});

module.exports = redis;
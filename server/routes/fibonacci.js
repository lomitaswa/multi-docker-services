const keys = require('../keys');
const express = require('express');
const route = express.Router();

// postgres client setup
const { Pool } = require('pg');
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort,
    ssl:
    process.env.NODE_ENV !== 'production'
      ? false
      : { rejectUnauthorized: false }
});

pgClient.on('connect', (client) => {
    client
        .query('CREATE TABLE IF NOT EXISTS values (number INT)')
        .catch((err) => console.log(err))
});

// redis client setup
const redis = require('redis');
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});
const redisPublisher = redisClient.duplicate();

route.get('/', (req, res) => {
    res.status(200).send('Hi');
});

// get all fibonacci sequence from pg db
route.get('/values/all', async (req, res) => {
    const values = await pgClient.query('SELECT * FROM values');
    res.status(200).send(values.rows);
});

// get all sequence stored in redis
route.get('/values/current', async (req, res) => {
    redisClient.hgetall('values', (err, values) => {
        res.status(200).send(values);
    });
});

// insert new index in db
route.post('/values', async (req, res) => {
    const index = req.body.index;

    if(index > 40) {
        return res.status(422).send('Index too high');
    }

    redisClient.hset('values', index, 'Nothing yet!');
    redisPublisher.publish('insert', index);
    pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);

    res.status(200).send('working on it');
});

module.exports = route;
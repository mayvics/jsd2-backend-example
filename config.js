require('dotenv').config();

const config = {
    port: process.env.PORT || 8080,
    mongodb: process.env.MONGODB,
    token_key: process.env.TOKEN_KEY
};

module.exports = config;
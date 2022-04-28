require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 5000,
    DATABASE: process.env.DB_CONNECTION_URL || 'mongodb://localhost:27017/Superheros',

    AWS_S3_REGION: process.env.AWS_S3_REGION,
    AWS_S3_NAME: process.env.AWS_S3_NAME,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_PRIVAT_KEY,

    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:3000;http://localhost:8080'
};

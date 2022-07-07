module.exports = {
    PORT: process.env.PORT || '5000',
    MONGO_URL: process.env.MONGO_URL || '127.0.0.1',
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'asds',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET  || 'qwe',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'email@email.com',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || '12345',

    FRONTEND_URL:process.env.FRONTEND_URL || 'google.com'
};
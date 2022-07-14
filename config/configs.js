module.exports = {
    PORT: process.env.PORT || '5000',
    MONGO_URL: process.env.MONGO_URL || '127.0.0.1',
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'asds',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'qwe',
    ACTION_TOKEN_SECRET: process.env.ACTION_TOKEN_SECRET || 'forgot',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'email@email.com',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || '12345',

    FRONTEND_URL: process.env.FRONTEND_URL || 'google.com',

    TWILIO_ACCOUNT_SSID: process.env.TWILIO_ACCOUNT_SSID || 'asdasd',
    TWILIO_ACCESS_TOKEN: process.env.TWILIO_ACCESS_TOKEN || 'asdads',
    TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER || '+12423567435',

    AWS_S3_BUCKET: process.env.AWS_S3_BUCKET || 'sample',
    AWS_S3_REGION: process.env.AWS_S3_REGION || 'sample',
    AWS_S3_ACCESS_KEY_ID: process.env.AWS_S3_ACCESS_KEY_ID || 'sample',
    AWS_S3_SECRET_ACCESS_KEY: process.env.AWS_S3_SECRET_ACCESS_KEY || 'sample',
};
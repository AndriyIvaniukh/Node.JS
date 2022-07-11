const twilio = require('twilio')
const {configs} = require('../config')


const client = twilio(configs.TWILIO_ACCOUNT_SSID, configs.TWILIO_ACCESS_TOKEN);

module.exports = {
    sendSMS: async (phone, message) => {
        try{
            console.log(`SMS start sending || To ${phone} || Message ${message}`);

            await client.messages.create({
                from: configs.TWILIO_PHONE_NUMBER,
                to: phone,
                body: message,
            });
        }catch (e) {
            console.error(`SMS not send || To ${phone} || Message ${e}`)
        }
    }

}

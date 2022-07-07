const nodemailer = require('nodemailer');
const hbs= require('nodemailer-express-handlebars');
const path = require('path');

const CustomError = require('../errors/CustomError')
const {configs} = require('../config');
const emailTemplates = require('../email-templates');

module.exports = {
    sendMail: async (userMail = '', emailAction = '', locals = {}) => {
        const transporter = nodemailer.createTransport({
            from: 'No reply',
            auth: {
                user: configs.NO_REPLY_EMAIL,
                pass: configs.NO_REPLY_EMAIL_PASSWORD,
            },
            service: 'gmail',
        });

        const hbsOptions = {
            viewEngine:{
                extname: '.hbs',
                defaultLayout: 'main',
                layoutsDir: path.join(process.cwd(), 'email-templates', 'layouts'),
                partialsDir: path.join(process.cwd(), 'email-templates', 'partials'),
            },
            viewPath: path.join(process.cwd(), 'email-templates', 'views'),
            extName: '.hbs'
        };

        transporter.use('compile', hbs(hbsOptions));

        const templateInfo = emailTemplates[emailAction];
        if (!templateInfo) {
            throw new CustomError('Wrong email action', 500)
        }

        locals.frontendURL = configs.FRONTEND_URL;

        return transporter.sendMail({
            to: userMail,
            subject: templateInfo.subject,
            template: templateInfo.template,
            context: locals,
        });
    }
}
require("dotenv").config();


const PORT = process.env.PORT || 3000;
const VERSION = process.env.VERSION;
const PASSMAILER = process.env.PASSMAILER;
const MAILER = process.env.MAILER;
const HOST = process.env.HOST;
const SERVICE = process.env.SERVICE;
const JWT_SECRET = process.env.JWT_SECRET;
const MONGODB_URI = process.env.MONGODB_URI;


module.exports = {
    PORT,
    VERSION,
    PASSMAILER,
    MAILER,
    HOST,
    SERVICE,
    JWT_SECRET,
    MONGODB_URI
}
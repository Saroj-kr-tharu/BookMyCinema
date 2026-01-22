const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  salt: bcrypt.genSaltSync(10),
  PRIVATEJWT: process.env.PRIVATEJWT,
  SESSION_SECRET: process.env.SESSION_SECRET,
  DBSYNC: process.env.DBSYNC,

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_FUNCTION: process.env.GOOGLE_CALLBACK_FUNCTION,


  MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
  CHANNEL_NAME: process.env.CHANNEL_NAME,
  EXCHANGE_NAME: process.env.EXCHANGE_NAME,
  REMINDER_BINDING_KEY: process.env.REMINDER_BINDING_KEY,

  FORTEND_REDIRECT_URL: process.env.FORTEND_REDIRECT_URL,
  BASEURL_AUTH: process.env.BASEURL_AUTH,
  
};

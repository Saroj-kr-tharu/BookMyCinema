const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  DB_NAME: process.env.DB_NAME,
  AUTH_BACKEND_URL: process.env.AUTH_BACKEND_URL,
  PAYMENT_BACKEND_URL: process.env.PAYMENT_BACKEND_URL,
  
  FORTEND_SUCESS_URL: process.env.FORTEND_SUCESS_URL,

  MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
  REMINDER_BINDING_KEY: process.env.REMINDER_BINDING_KEY,
  EXCHANGE_NAME: process.env.EXCHANGE_NAME,

};

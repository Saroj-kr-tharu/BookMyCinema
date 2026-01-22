const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  MESSAGE_BROKER_URL:process.env.MESSAGE_BROKER_URL,
  REMINDER_BINDING_KEY: process.env.REMINDER_BINDING_KEY,
  EXCHANGE_NAME: process.env.EXCHANGE_NAME,
  MOVIE_BOOKING_URL: process.env.MOVIE_BOOKING_URL,
  
};

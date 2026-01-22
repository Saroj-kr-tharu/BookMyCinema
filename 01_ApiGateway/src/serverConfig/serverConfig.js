const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    FORTEND_URL: process.env.FORTEND_URL,
    AUTH_BACKEND_URL: process.env.AUTH_BACKEND_URL,
    BOOKING_BACKEND_URL: process.env.BOOKING_BACKEND_URL,
    PAYMENT_BACKEND_URL: process.env.PAYMENT_BACKEND_URL,
}
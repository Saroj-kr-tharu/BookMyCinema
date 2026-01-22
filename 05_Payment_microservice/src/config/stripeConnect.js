const {STRIPE_SECRET_KEY} = require('./stripeConfig');

const stripe = require('stripe')(STRIPE_SECRET_KEY);

module.exports = stripe;
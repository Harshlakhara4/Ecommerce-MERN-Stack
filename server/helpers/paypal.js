const paypal = require("paypal-rest-sdk");
require("dotenv").config(); // Load .env before using process.env

paypal.configure({
  mode: process.env.PAYPAL_MODE || "sandbox", // sandbox or live
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

module.exports = paypal;

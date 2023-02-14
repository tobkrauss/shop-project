const express = require("express");
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const { application, json } = require('express');


router.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
       payment_method_types: ['card'],
       mode: 'payment',
       line_items: [price, quantity] ,
       success_url: `${process.env.SERVER_URL}/success.html`,
       cancel_url: `${process.env.SERVER_URL}/cancel.html`,
    
  });
  res.render("checkout-session", {url: session.url})
  
});



module.exports = router;

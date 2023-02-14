const express = require("express");
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const { application, json } = require('express');


router.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
       payment_method_types: ['card'],
       mode: 'payment',
       line_items: [{price: 'price_H5ggYwtDq4fbrJ', quantity: 2}],
       success_url: `${process.env.SERVER_URL}/success.html`,
       cancel_url: `${process.env.SERVER_URL}/cancel.html`,
    
  });
  res.redirect(303, session.url)
  
});



module.exports = router;

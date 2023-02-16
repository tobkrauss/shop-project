const express = require("express");
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const { application, json } = require('express');
const Cart = require("../models/Cart.model");

router.post('/create-checkout-session', async (req, res) => {
  const productId = req.body.productID;
  const cartId = req.session.cartID;

  const cart = await Cart.findById(cartId)
  const products = cart.products

  let result = []
  for (let i = 0; i < products.length; i++) {
   result.push( {
      price_data: {
        currency: "usd",
        unit_amount: cart.products[i].price*100,
        product_data: {
          name: `${cart.products[i].brand} ${cart.products[i].model}`,
        },
      },
      quantity: 1,
    })
  }
  

  const session = await stripe.checkout.sessions.create({
       payment_method_types: ['card'],
       mode: 'payment',
       line_items: result,
       success_url: `${process.env.SERVER_URL}cart`,
       cancel_url: `${process.env.SERVER_URL}cart`,
  });
  console.log("PAYMENT SESSION CREATED")
  res.redirect(303, session.url)
  
});



module.exports = router;

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
  const price = cart.products[0].price
  const productName = `${cart.products[0].brand} ${cart.products[0].model}`

  const session = await stripe.checkout.sessions.create({
       payment_method_types: ['card'],
       mode: 'payment',
       line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: price*100,
            product_data: {
              name: productName,
            },
          },
          quantity: 1,
        },
      ],
       success_url: `${process.env.SERVER_URL}cart`,
       cancel_url: `${process.env.SERVER_URL}cart`,
  });
  console.log("PAYMENT SESSION CREATED")
  res.redirect(303, session.url)
  
});



module.exports = router;

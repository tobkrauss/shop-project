const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const express = require('express');
const router = express.Router();

const button = document.getElementById("checkout-button")
button.addEventListener("click", () => {
    console.log("Checkout")
})



router.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: '{{PRICE_ID}}',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.SERVER_URL}/success.html`,
    cancel_url: `${process.env.SERVER_URL}/cancel.html`,
    
  });
  res.render("checkout-session", session)
  
});
const app = require("./app");
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const { application, json } = require('express');
const express = require('express');
const router = express.Router();

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT || 3000;


const storeItems = new Map([
  [1, {priceInCents: 10000, name: "Rolex Watch"}],
  [2, {priceInCents: 20000, name: "Omega Watch"}],
])

router.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
       payment_method_types: ['card'],
       mode: 'payment',
       line_items: req.body.items.map(item =>{
        const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: "EUR"
          },
          quantity: item.quantity
        }
       }),
       success_url: `${process.env.SERVER_URL}/success.html`,
       cancel_url: `${process.env.SERVER_URL}/cancel.html`,
    
  });
  res.render("checkout-session", {url: session.url})
  
});









app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

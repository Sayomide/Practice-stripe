require("dotenv").config()
const express = require("express")
const app = express()
app.use(express.json())

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

// This is the list of items we are selling
const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Learn React Today" }],
  [2, { priceInCents: 15000, name: "Learn CSS Today" }],
])
// Create a post request for /create-checkout-session
app.post("/create-checkout-session", async (req, res) => {
  try {
 const session = await stripe.checkout.sessions.create({
payment_method_types: ["card"],
// use each items id to get it's information Take that information and convert it to Stripe's format
line_items: req.body.items.map(({ id, quantity }) => {
        const storeItem = storeItems.get(id)
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: quantity,
        }
      }),
mode: "payment",
success_url: `${process.env.CLIENT_URL}/success.html`,
cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
    });
    console.log(session);
    res.json({ url: session.url });
    console.log(session.url)
  } catch (e) {
    // If there is an error send it to the client
    res.status(500).json({ error: e.message })
  }
})

app.listen(3000, () => console.log(`Listening on  port ${3000}!`));
import Transaction from "../models/Transaction.js";
import Stripe from "stripe";
import { Item } from "../models/Item.js";
import { logError } from "../util/logging.js";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export const createCheckout = async (req, res) => {
  try {
    const { itemId } = req.params;
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).send("Item not found");
    }

    const product = await stripe.products.create({
      name: item.title,
    });

    const transaction = Transaction.findOne({ item_id: itemId });

    const customer = await stripe.customers.create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
    });

    const price = await stripe.prices.create({
      unit_amount: transaction.totalPrice * 100, // Amount in cents
      currency: "eur",
      product: product.id,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: "payment",
      customer: customer.id,
      success_url: `${process.env.BASE_CLIENT_URL}?success=true`,
      cancel_url: `${process.env.BASE_CLIENT_URL}?canceled=true`,
    });

    res.redirect(303, session.url);
  } catch (error) {
    logError(`Error creating a checkout session: ${error.message}`);
    res.status(500).send("Server error");
  }
};

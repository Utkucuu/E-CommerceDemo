import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { paymentMethodId, amount, billingDetails, products } = req.body;

    try {
    
      const customer = await stripe.customers.create({
        email: billingDetails.email,
        name: billingDetails.name,
        phone: billingDetails.phone,
        address: {
          line1: billingDetails.address.line1,
          city: billingDetails.address.city,
          state: billingDetails.address.state,
          postal_code: billingDetails.address.postal_code,
          country: billingDetails.address.country,
        },
      });

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        payment_method: paymentMethodId,
        confirm: true,
        customer: customer.id,
        payment_method_types: ["card"],
      });

      res.status(200).json({ paymentIntent, products, billingDetails });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error("PaymentIntent creation error:", errorMessage);
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

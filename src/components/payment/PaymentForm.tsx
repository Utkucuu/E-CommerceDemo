import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_API_KEY;

if (!stripePublicKey) {
  throw new Error("Stripe public key is not defined");
}

const stripePromise = loadStripe(stripePublicKey, {
  locale: "en",
});
const PaymentForm = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default PaymentForm;

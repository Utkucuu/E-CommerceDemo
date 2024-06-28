import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { clearConfirmedItems } from "@/features/cartSlice";
import { useRouter } from "next/navigation";
import { addOrder } from "@/features/ordersSlice";
import { useUser } from "@clerk/nextjs";
import AddressForm from "./AddressForm";
import CardDetailsForm from "./CardDetailsForm";
import { Divider } from "@nextui-org/react";

const CheckoutForm = () => {
  const { user } = useUser();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const cartTotal = useSelector((state: RootState) => state.cart.cartTotal);
  const cartItems = useSelector((state: RootState) =>
    state.cart.cartItems.filter((item) => item.addedToConfirmCart),
  );
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const router = useRouter();
  const [address, setAddress] = useState({
    line1: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
  });

  const handleCountryChange = (value: string | null) => {
    setSelectedCountry(value);
    setSelectedState(null);
    setAddress((prevAddress) => ({
      ...prevAddress,
      country: value || "",
      state: "",
      city: "",
    }));
  };

  const handleStateChange = (value: string | null) => {
    setSelectedState(value);
    setAddress((prevAddress) => ({
      ...prevAddress,
      state: value || "",
      city: "",
    }));
  };

  const handleCityChange = (value: string | null) => {
    setAddress((prevAddress) => ({
      ...prevAddress,
      city: value || "",
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      return;
    }

    const formData = new FormData(event.target as HTMLFormElement);

    const billingDetails = {
      name: formData.get("cardholderName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: {
        line1: formData.get("line1") as string,
        city: formData.get("city") as string,
        state: formData.get("state") as string,
        postal_code: formData.get("postal_code") as string,
        country: formData.get("country") as string,
      },
    };

    const products = cartItems.map((item) => ({
      id: item.id,
      title: item.title,
      quantity: item.quantity,
      description: item.description,
      price: item.price,
      image: item.image,
      size: item.size,
      category: item.category,
    }));

    setIsProcessing(true);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billingDetails,
      });

      if (error) {
        setErrMessage(`Payment failed: ${error.message}`);
        setIsProcessing(false);
        return;
      }

      const response = await fetch("/api/payment_intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount: Math.round(cartTotal * 100),
          billingDetails,
          products,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrMessage(`Payment failed: ${errorData.message}`);
        setIsProcessing(false);
        return;
      }

      const paymentResult = await response.json();

      if (paymentResult.error) {
        setErrMessage(`Payment failed: ${paymentResult.error.message}`);
      } else {
        setMessage(`Payment succeeded! Redirecting...`);

        if (user) {
          dispatch(addOrder({ order: paymentResult, userId: user.id }));
          dispatch(clearConfirmedItems({ userId: user.id }));
        }
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (err) {
      if (err instanceof Error) {
        setErrMessage(`Payment failed: ${err.message}`);
      } else {
        setMessage("Payment failed: An unknown error occurred");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-12 gap-y-8 md:gap-5 md:divide-x-1"
    >
      <AddressForm
        selectedCountry={selectedCountry}
        selectedState={selectedState}
        address={address}
        handleCountryChange={handleCountryChange}
        handleStateChange={handleStateChange}
        handleCityChange={handleCityChange}
      />

      <CardDetailsForm
        message={message}
        errMessage={errMessage}
        cartTotal={cartTotal}
        isProcessing={isProcessing}
      />
    </form>
  );
};

export default CheckoutForm;

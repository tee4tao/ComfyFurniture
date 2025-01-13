"use client";

import CheckoutPage from "@/components/CheckoutPage";
import { useCart } from "@/context/CartProvider";
import { convertToSubcurrency } from "@/lib/utils";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { countTotalPrice } = useCart();
  const amount = countTotalPrice();
  return (
    <section className="container mx-auto p-10 max-sm:mt-0 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-secondary to-primary mb-8">
      <div className="mb-10">
        <h1 className="text-4xl max-sm:text-2xl font-extrabold mb-2">
          Make Payment
        </h1>
        <h2 className="text-2xl max-sm:text-xl">
          You are paying
          <span className="font-bold"> ${amount} </span>
          to ComfyFurniture
        </h2>
      </div>
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount),
          currency: "usd",
        }}
      >
        <CheckoutPage amount={amount} />
      </Elements>
    </section>
  );
};

export default page;

"use client";
import { useCart } from "@/context/CartProvider";
import {
  clearCart,
  getCart,
  getLoggedInUser,
} from "@/lib/actions/users.action";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import AssuranceBanner from "./AssuranceBanner";

const CheckoutInfo = () => {
  const router = useRouter();
  const [onlinePayment, setOnlinePayment] = useState(true);
  const [cod, setCod] = useState(false);
  const {
    items: cartItems,
    countTotalPrice,
    countAllItems,
    clearCartItems,
  } = useCart();

  const payOnline = () => {
    setOnlinePayment(true);
    setCod(false);
  };
  const payOnDelivery = () => {
    setOnlinePayment(false);
    setCod(true);
  };

  const checkOut = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onlinePayment) {
      router.push("/payment");
    } else if (cod) {
      router.push("/pod");
      const loggedIn = await getLoggedInUser();
      const DBCartItems = await getCart(loggedIn?.$id);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const findId = DBCartItems.documents.map((item: any) => item.$id);
      clearCart(findId);
      clearCartItems();
    }
  };

  return (
    <section className="w-full flex flex-col flex-center">
      <form
        action=""
        onSubmit={checkOut}
        className="container flex flex-col md:flex-row flex-center md:items-start gap-6 md:justify-around my-6 px-4"
      >
        <article className="w-full">
          <h2 className="text-2xl mb-6 font-bold">Billing Details</h2>
          <div className="space-y-4 w-full md:w-[28rem]">
            <div className="md:flex gap-2 w-full">
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="first-name" className="font-semibold">
                  First Name
                </label>
                <input
                  type="text"
                  required
                  id="first-name"
                  className="border border-gray-300 rounded-md h-10"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="last-name" className="font-semibold">
                  Last Name
                </label>
                <input
                  type="text"
                  required
                  id="last-name"
                  className="border border-gray-300 rounded-md h-10 focus:border-primary"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="company-name" className="font-semibold">
                Company Name (Optional)
              </label>
              <input
                type="text"
                id="company-name"
                className="border border-gray-300 rounded-md h-10 focus:border-primary"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                required
                id="country"
                className="border border-gray-300 rounded-md h-10"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="street-name">Street Address</label>
              <input
                type="text"
                required
                id="street-name"
                className="border border-gray-300 rounded-md h-10"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="town">Town / City</label>
              <input
                type="text"
                required
                id="town"
                className="border border-gray-300 rounded-md h-10"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="zip-code">Zip Code</label>
              <input
                type="number"
                required
                id="zip-code"
                className="border border-gray-300 rounded-md h-10"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                required
                id="phone"
                className="border border-gray-300 rounded-md h-10"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                required
                id="email"
                className="border border-gray-300 rounded-md h-10"
              />
            </div>
            <textarea
              name=""
              id=""
              placeholder="Additional Information"
              className="border border-gray-300 rounded-md w-full h-20"
            ></textarea>
          </div>
        </article>

        <article className="space-y-4">
          <div className="flex justify-between font-bold text-lg">
            <h3>Product</h3>
            <h3>Subtotal</h3>
          </div>
          {cartItems.map((item) => {
            return (
              <div
                key={item.product._id}
                className="flex justify-between text-sm"
              >
                <p className="">
                  <span className="text-gray-300">{item.product.name} </span> x{" "}
                  <span> {item.count}</span>
                </p>
                <p>$ {item.product.price}</p>
              </div>
            );
          })}
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p className="font-semibold">$ {countTotalPrice()}</p>
          </div>
          <div className="flex justify-between">
            <p>Total</p>
            <p className="text-xl font-bold text-primary">
              $ {countTotalPrice()}
            </p>
          </div>
          {/* payment option */}
          <div className="border-t flex flex-col border-gray-300">
            <div className="space-y-2 mt-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="payment-method"
                  value="direct-bank"
                  className="h-4 w-4"
                  defaultChecked
                  onClick={payOnline}
                />
                <span className="text-sm font-medium">
                  Direct Bank Transfer
                </span>
              </label>
              <p className="text-gray-400 text-sm">
                Make your payment directly into our bank account. Please use
                your Order ID as the payment reference. Your order will not be
                shipped until the funds have cleared in our account.
              </p>

              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="payment-method"
                  value="cod"
                  className="h-4 w-4"
                  onClick={payOnDelivery}
                />
                <span className="text-sm font-medium">Cash on Delivery</span>
              </label>
            </div>

            {/* Privacy Policy */}
            <p className="text-gray-400 text-sm mt-3">
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our{" "}
              <a href="#" className="text-blue-500 underline">
                privacy policy
              </a>
              .
            </p>

            {/* Place Order Button */}
            <button
              type="submit"
              disabled={countAllItems() === 0}
              className={`${countAllItems() === 0 ? "hover:cursor-not-allowed hover:bg-gray-300" : "hover:bg-primary hover:cursor-pointer"} mt-6 self-center border w-32 py-3 rounded-md  transition hover:border-0`}
            >
              Place order
            </button>
          </div>
        </article>
      </form>
      <AssuranceBanner />
    </section>
  );
};

export default CheckoutInfo;

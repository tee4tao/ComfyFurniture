import CartItems from "@/components/CartItems";
import PageBanner from "@/components/PageBanner";
import { getCart, getLoggedInUser } from "@/lib/actions/users.action";
import React from "react";

const cart = async () => {
  const loggedIn = await getLoggedInUser();
  const DBCartItems = await getCart();
  // console.log(cartItems);

  return (
    <div className="w-full flex flex-col flex-center">
      <PageBanner />
      <CartItems loggedIn={loggedIn} DBCartItems={DBCartItems} />
    </div>
  );
};

export default cart;

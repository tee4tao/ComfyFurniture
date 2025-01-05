import CartItems from "@/components/CartItems";
import PageBanner from "@/components/PageBanner";
import { getCart, getLoggedInUser } from "@/lib/actions/users.action";
import React from "react";

const cart = async () => {
  const loggedIn = await getLoggedInUser();
  const DBCartItems = await getCart(loggedIn?.$id);

  return (
    <div className="w-full flex flex-col flex-center mb-8">
      <PageBanner />
      <CartItems loggedIn={loggedIn} DBCartItems={DBCartItems} />
    </div>
  );
};

export default cart;

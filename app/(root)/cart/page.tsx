import CartItems from "@/components/CartItems";
import PageBanner from "@/components/PageBanner";
import { getLoggedInUser } from "@/lib/actions/users.action";
import React from "react";

const cart = async () => {
  const loggedIn = await getLoggedInUser();
  console.log(loggedIn);

  return (
    <div className="w-full flex flex-col flex-center">
      <PageBanner />
      <CartItems loggedIn={loggedIn} />
    </div>
  );
};

export default cart;

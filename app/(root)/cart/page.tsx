import CartItems from "@/components/CartItems";
import PageBanner from "@/components/PageBanner";
import React from "react";

const cart = () => {
  return (
    <div className="w-full flex flex-col flex-center">
      <PageBanner />
      <CartItems />
    </div>
  );
};

export default cart;

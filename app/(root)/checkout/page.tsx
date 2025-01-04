import CheckoutInfo from "@/components/CheckoutInfo";
import PageBanner from "@/components/PageBanner";
import React from "react";

const page = () => {
  return (
    <div className="mb-8">
      <PageBanner />
      <CheckoutInfo />
    </div>
  );
};

export default page;

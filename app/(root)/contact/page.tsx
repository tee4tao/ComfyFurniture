import ContactInfo from "@/components/ContactInfo";
import PageBanner from "@/components/PageBanner";
import React from "react";

const Contact = () => {
  return (
    <div className="w-full flex flex-col flex-center ">
      <PageBanner />
      <ContactInfo />
    </div>
  );
};

export default Contact;

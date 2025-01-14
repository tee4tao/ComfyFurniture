import { cartBanner } from "@/constants";
import Image from "next/image";
import React from "react";

const AssuranceBanner = () => {
  return (
    <div className="w-full bg-secondary h-fit py-3 lg:py-6 flex items-center justify-around gap-1 mb-1">
      {cartBanner.map((item, idx) => {
        return (
          <div
            key={idx}
            className="flex flex-center gap-4 max-sm:flex-col max-sm:gap-2"
          >
            <Image
              src={item.icon}
              alt={item.title}
              width={10}
              height={10}
              className="w-10"
            />
            <div className="max-sm:text-center">
              <h3 className="text-xl max-sm:text-base font-semibold">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500">{item.details}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AssuranceBanner;

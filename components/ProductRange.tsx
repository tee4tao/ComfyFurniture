import { rangeInfo } from "@/constants";
import Image from "next/image";
import React from "react";

const ProductRange = () => {
  return (
    <section className="container flex flex-col items-center px-2">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">Browse The Range</h2>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </p>
      </div>
      <div className="flex gap-4 xl:gap-6">
        {rangeInfo.map((item, index) => (
          <div key={index} className="text-center space-y-2">
            <Image
              src={item.image}
              alt={item.title}
              width={200}
              height={300}
              className="object-cover md:w-96"
            />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductRange;

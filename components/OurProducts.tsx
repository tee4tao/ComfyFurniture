import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

const OurProducts = ({ data }: { data: product[] }) => {
  return (
    <section className="container flex flex-col items-center px-2">
      <h2 className="text-2xl font-bold text-center mb-4">Our Products</h2>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
        {data.map((product) => {
          return (
            <div key={product._id}>
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={200}
                height={200}
                className="object-cover w-full rounded-t-lg"
              />
              <div className="bg-[#F4F5F7] p-2 rounded-b-lg space-y-2 h-40">
                <h2 className="text-2xl font-semibold">{product.name}</h2>
                <p className="text-gray-600 font-semibold">{product.details}</p>
                <p className="font-semibold text-lg ">#{product.price}</p>
              </div>
            </div>
          );
        })}
      </div>

      <Button className="mt-4 bg-transparent text-primary rounded-none border-2 hover:text-white font-bold text-base">
        Show More
      </Button>
    </section>
  );
};

export default OurProducts;

"use client";
import React, { useState } from "react";
import { HiViewGrid } from "react-icons/hi";
import { TbLayoutList } from "react-icons/tb";

import ProductCard from "@/components/ProductCard";

const ShopProducts = ({ data }: { data: product[] }) => {
  const [flex, setFlex] = useState(false);
  return (
    <section className="w-full flex flex-col flex-center">
      <div className="w-full bg-secondary flex items-center justify-around py-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="hidden space-x-2 max-md:flex">
            <HiViewGrid
              onClick={() => setFlex(false)}
              className="cursor-pointer"
            />
            <TbLayoutList
              onClick={() => setFlex(true)}
              className="cursor-pointer"
            />
          </div>
          <p className="font-bold text-gray-600 hidden max-md:block">|</p>
          <p>Showing 1-16 of 32 results</p>
        </div>
        <div className="flex gap-4">
          <div>show</div>
          <div>sort by</div>
        </div>
      </div>
      <div
        className={
          flex
            ? `flex flex-col gap-4`
            : `container grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4`
        }
      >
        {data.map((product) => {
          return <ProductCard product={product} key={product._id} />;
        })}
      </div>
    </section>
  );
};

export default ShopProducts;

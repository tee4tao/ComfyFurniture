"use client";
import React, { useState } from "react";
import { HiViewGrid } from "react-icons/hi";
import { TbLayoutList } from "react-icons/tb";
import { usePagination } from "@mantine/hooks";

import ProductCard from "@/components/ProductCard";
import { Button } from "./ui/button";

const ShopProducts = ({ data }: { data: product[] }) => {
  const itemsPerPage = 4;

  const [visibleData, setVisibleData] = useState(data.slice(0, itemsPerPage));

  const total = Math.ceil(data.length / itemsPerPage);
  const pagination = usePagination({
    total,
    initialPage: 1,
    onChange(page) {
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      setVisibleData(data.slice(start, end));
    },
  });
  const [flex, setFlex] = useState(false);

  return (
    <section className="w-full flex flex-col flex-center">
      <div className="w-full bg-secondary flex items-center justify-around py-4 mb-8">
        <div className="flex items-center gap-4 max-md:gap-2">
          <div className="hidden space-x-1 max-md:flex">
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
          <p className=" max-md:text-sm">Showing 1-16 of 32 results</p>
        </div>
        <div className="flex items-center justify-around gap-4">
          <form action="" className="space-x-2 flex flex-wrap flex-center">
            <label htmlFor="items-number" className="max-md:text-sm">
              Show
            </label>
            <input
              type="number"
              name=""
              id="items-number"
              placeholder="16"
              className="w-9 h-8"
              min={4}
            />
          </form>
          <select name="" id="" className="max-md:text-xs">
            <option value="">Default</option>
            <option value="">Ascending</option>
            <option value="">Descending</option>
          </select>
        </div>
      </div>
      <div
        className={
          flex
            ? `flex flex-col gap-4`
            : `container grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4`
        }
      >
        {visibleData.map((product) => {
          return <ProductCard product={product} key={product._id} />;
        })}
      </div>
      {itemsPerPage < data.length && (
        <div className="flex justify-center space-x-2 mt-4">
          {pagination.range.map((range) =>
            range === "dots" ? (
              <Button key={range}>...</Button>
            ) : (
              <Button
                onClick={() => pagination.setPage(range)}
                className={
                  pagination.active === range ? "bg-primary" : "bg-transparent"
                }
                key={range}
              >
                {range}
              </Button>
            )
          )}
        </div>
      )}
    </section>
  );
};

export default ShopProducts;

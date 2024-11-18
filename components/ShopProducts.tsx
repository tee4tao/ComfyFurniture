"use client";
import React, { useEffect, useRef, useState } from "react";
import { HiViewGrid } from "react-icons/hi";
import { TbLayoutList } from "react-icons/tb";
import { usePagination } from "@mantine/hooks";

import ProductCard from "@/components/ProductCard";
import { Button } from "./ui/button";

const ShopProducts = ({ data }: { data: product[] }) => {
  const [sortBy, setSortBy] = useState<string | number>("");

  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [itemsDisplayed, setItemsDisplayed] = useState("");

  const [visibleData, setVisibleData] = useState(data.slice(0, itemsPerPage));

  const originalData = useRef([...data]);

  // const [unsortedData, setUnsortedData] = useState([...originalData]);

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
  useEffect(() => {
    if (sortBy === "Descending") {
      data.sort((a, b) => b.name.localeCompare(a.name));
      setVisibleData(data.slice(0, itemsPerPage));
      // pagination.setPage(1);
    }
    if (sortBy === "Ascending") {
      data.sort((a, b) => a.name.localeCompare(b.name));
      setVisibleData(data.slice(0, itemsPerPage));
      // pagination.setPage(1);
    }
    if (sortBy === "Default" || sortBy === "") {
      // data = [...originalData];
      setVisibleData(originalData.current.slice(0, itemsPerPage));
    }
  }, [data, itemsPerPage, originalData, sortBy]);

  // const handleShowAmount = (e: React.ChangeEventHandler<HTMLInputElement>) => {
  //   e.preventDefault();
  //   setItemsPerPage(e.target.value);
  // };

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
          <p className=" max-md:text-sm">
            Showing 1 - {itemsPerPage} of {data.length} results
          </p>
        </div>
        <div className="flex items-center justify-around gap-4">
          <form
            action=""
            className="space-x-2 flex flex-wrap flex-center"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
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
              value={itemsDisplayed}
              onChange={(e) => {
                if (e.target.value === "" || +e.target.value < 4) {
                  setItemsPerPage(4);
                  setItemsDisplayed(e.target.value);
                } else if (+e.target.value > data.length) {
                  setItemsPerPage(data.length);
                  setItemsDisplayed(e.target.value);
                } else {
                  setItemsPerPage(+e.target.value);
                  setItemsDisplayed(e.target.value);
                }
              }}
            />
          </form>
          <select
            name=""
            id=""
            onChange={(e) => {
              setSortBy(e.target.value);
            }}
            className="max-md:text-xs"
          >
            <option value="Default">Default</option>
            <option value="Ascending">Ascending</option>
            <option value="Descending">Descending</option>
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

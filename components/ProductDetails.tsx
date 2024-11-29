"use client";
import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";
import { FiMinus, FiPlus } from "react-icons/fi";

const ProductDetails = ({ data, slug }: { data: product[]; slug: string }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const sizes = ["L", "XL", "XS"];
  const colors = [
    { name: "Purple", value: "bg-purple-500" },
    { name: "Black", value: "bg-black" },
    { name: "Gold", value: "bg-yellow-600" },
  ];
  return (
    <section className="w-screen overflow-hidden flex flex-col flex-center">
      <div className="w-full bg-secondary py-4 mb-8">
        <Breadcrumb className="pl-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="font-semibold capitalize">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/shop" className="text-gray-600 capitalize">
                shop
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-600 capitalize">
                {slug}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {data ? (
        data.map((product: product, index: number) => {
          if (product.slug.current === slug) {
            const { name, details, imageUrl, price } = product;
            return (
              // <div  key={index} className="container ">
              <div
                className="flex items-center justify-around space-x-12 w-4/5 px-2 max-sm:flex-col space-y-4 max-sm:w-full"
                key={index}
              >
                <Image
                  src={imageUrl}
                  alt={name}
                  width={300}
                  height={300}
                  className="w-60"
                />
                <div className="space-y-2">
                  <h1 className="text-2xl font-semibold">{name}</h1>
                  <p className="text-gray-600 font-bold text-lg ">#{price}</p>
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellat pariatur deserunt neque sequi illo maiores, quaerat
                    ea et laborum blanditiis!
                  </p>
                  {/* size and color */}
                  <div className="pt-2 space-y-4">
                    {/* Size Options */}
                    <div>
                      <h3 className="text-gray-500 text-sm mb-2">Size</h3>
                      <div className="flex space-x-4">
                        {sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-3 py-[0.1rem] border rounded ${
                              selectedSize === size
                                ? "bg-primary text-white border-primary"
                                : "bg-white text-gray-500 border-gray-300"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Color Options */}
                    <div>
                      <h3 className="text-gray-500 text-sm mb-2">Color</h3>
                      <div className="flex space-x-4">
                        {colors.map((color) => (
                          <button
                            key={color.name}
                            onClick={() => setSelectedColor(color.name)}
                            className={`w-6 h-6 rounded-full ${color.value} ${
                              selectedColor === color.name
                                ? "ring-2 ring-offset-2 ring-primary"
                                : ""
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Selected Options */}
                    {/* <div className="mt-4 text-gray-700">
                      <p>Selected Size: {selectedSize || "None"}</p>
                      <p>Selected Color: {selectedColor || "None"}</p>
                    </div> */}
                  </div>
                  {/* cart, quantity and compare button */}
                  <div className="flex items-center space-x-2">
                    {/* quantity button */}
                    <div className="flex items-center justify-between border border-gray-300 rounded px-2 py-1 space-x-2">
                      <FiMinus
                        className="cursor-pointer hover:text-primary"
                        onClick={() => {
                          setQuantity(quantity - 1);
                          if (quantity === 1) {
                            setQuantity(1);
                          }
                        }}
                      />
                      <p>{quantity}</p>
                      <FiPlus
                        className="cursor-pointer hover:text-primary"
                        onClick={() => setQuantity(quantity + 1)}
                      />
                    </div>
                    {/* add to cart button */}
                    <button className="border border-gray-300 rounded px-2 py-1 text-nowrap capitalize hover:text-primary">
                      add to cart
                    </button>
                    {/* compare button */}
                    <button className="flex items-center justify-between border border-gray-300 rounded px-2 py-1 hover:text-primary">
                      <FiPlus />
                      <p>Compare</p>
                    </button>
                  </div>
                </div>
              </div>
              // </div>
            );
          }
        })
      ) : (
        <div>loading...</div>
      )}
    </section>
  );
};

export default ProductDetails;

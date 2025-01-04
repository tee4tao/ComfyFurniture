"use client";
import React, { useState } from "react";

import Image from "next/image";
import {
  FaFacebook,
  FaLinkedin,
  FaSquareXTwitter,
  FaStar,
} from "react-icons/fa6";
import Link from "next/link";
import RelatedProducts from "./RelatedProducts";
import AdditionalProductInfo from "./AdditionalProductInfo";
import CartItemsOverlay from "./CartItemsOverlay";
import AddToCart from "./AddToCart";

const ProductDetails = ({
  data,
  slug,
  loggedIn,
}: {
  data: product[];
  slug: string;
  loggedIn: unknown;
}) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [showCartItems, setShowCartItems] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [newData, setNewData] = useState<product[]>(
    data.filter((product) => {
      return product.slug.current !== slug;
    })
  );

  const color = {
    orange: "#F2C265",
    grey: "a9a9a9",
  };
  const stars = Array(5).fill(0);
  const sizes = ["L", "XL", "XS"];
  const colors = [
    { name: "Purple", value: "bg-purple-500" },
    { name: "Black", value: "bg-black" },
    { name: "Gold", value: "bg-yellow-600" },
  ];
  if (!data) {
    return <div>loading.</div>;
  }
  return (
    <section className="w-full overflow-hidden flex flex-col flex-center">
      {/* cart overlay */}
      <CartItemsOverlay
        showCartItems={showCartItems}
        setShowCartItems={setShowCartItems}
        loggedIn={loggedIn}
      />

      {data.map((product: product, index: number) => {
        if (product.slug.current === slug) {
          const { name, imageUrl, price } = product;
          return (
            // <div  key={index} className="container ">
            <article
              className="flex items-start justify-around space-x-12 w-4/5 px-2 max-sm:flex-col max-sm:items-center space-y-4  container "
              key={index}
            >
              {/* overlay when the cart is displayed */}
              <div
                className={`${showCartItems && "opacity-100 inset-0"} opacity-0 fixed  z-10  bg-black/40  transition-all ease-linear duration-300`}
              />
              {/* {showCartItems && (
                <div className="fixed inset-0 z-10 bg-black/40  transition-all duration-1000" />
              )} */}
              <Image
                src={imageUrl}
                alt={name}
                width={300}
                height={300}
                priority={true}
                className="w-64"
              />
              <div className="">
                <div className="space-y-2">
                  <h1 className="text-3xl tracking-wider font-semibold">
                    {name}
                  </h1>
                  <p className="text-gray-600 font-bold text-lg ">#{price}</p>
                  <div className="flex gap-2">
                    {stars.map((_, index) => {
                      return (
                        <div key={index}>
                          <FaStar
                            size={18}
                            color={4 > index ? color.orange : color.grey}
                          />
                        </div>
                      );
                    })}
                    <div className="border-r border-r-gray-300" />
                    <div className="text-gray-300 text-sm">
                      5 Customers Review
                    </div>
                  </div>
                  <p className="text-sm">
                    Setting the bar as one of the loudest speakers in its class,
                    the Kilburn is a compact, stout-hearted hero with a
                    well-balanced audio which boasts a clear midrange and
                    extended highs for a sound.
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
                            className={`px-3 py-[0.1rem] border rounded hover:bg-primary ${
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

                  <AddToCart
                    product={product}
                    setShowCartItems={setShowCartItems}
                    quantity={quantity}
                    setQuantity={setQuantity}
                  />
                </div>
                {/* underline */}
                <div className="  border-t border-t-gray-300 my-6" />
                {/* other infos */}
                <div className="text-gray-300 space-y-4">
                  <div className="flex text-lg">
                    <div className="w-24">SKU</div>
                    <div className="space-x-2">
                      <span>:</span>
                      <span>SS001</span>
                    </div>
                  </div>
                  <div className="flex text-lg">
                    <div className="w-24">Category</div>
                    <div className="space-x-2">
                      <span>:</span>
                      <span>Sofas</span>
                    </div>
                  </div>
                  <div className="flex text-lg">
                    <div className="w-24">Tags</div>
                    <div className="space-x-2">
                      <span>:</span>
                      <span>Sofas, Chair, Home, Shop</span>
                    </div>
                  </div>
                  <div className="flex text-lg">
                    <div className="w-24">Share</div>
                    <div className="space-x-2 flex items-center">
                      <span>:</span>
                      <div className="flex space-x-2 text-black text-xl">
                        <Link href={"#"}>
                          <FaFacebook />
                        </Link>
                        <Link href={"#"}>
                          <FaLinkedin />
                        </Link>
                        <Link href={"#"}>
                          <FaSquareXTwitter />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
            // </div>
          );
        }
      })}
      {/* description, additional information & reviews */}
      <AdditionalProductInfo stars={stars} color={color} />

      {/* related products */}
      <RelatedProducts newData={newData} />
    </section>
  );
};

export default ProductDetails;

"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import { FiMinus, FiPlus } from "react-icons/fi";
import { FaFacebook, FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";
import Link from "next/link";
import ProductCard from "./ProductCard";

const ProductDetails = ({ data, slug }: { data: product[]; slug: string }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [description, setDescription] = useState(true);
  const [additionalInfo, setAdditionalInfo] = useState(false);
  const [reviews, setReviews] = useState(false);
  const [newData, setNewData] = useState<product[]>(
    data.filter((product) => {
      return product.slug.current !== slug;
    })
  );
  const sizes = ["L", "XL", "XS"];
  const colors = [
    { name: "Purple", value: "bg-purple-500" },
    { name: "Black", value: "bg-black" },
    { name: "Gold", value: "bg-yellow-600" },
  ];
  // useEffect(() => {
  //   setNewData(
  //     data.filter((product) => {
  //       return product.slug.current !== slug;
  //     })
  //   );
  //   // console.log(newData);
  // }, [data, slug]);
  if (!data) {
    return <div>loading.</div>;
  }
  return (
    <section className="w-full overflow-hidden flex flex-col flex-center">
      {data.map((product: product, index: number) => {
        if (product.slug.current === slug) {
          const { name, details, imageUrl, price } = product;
          return (
            // <div  key={index} className="container ">
            <article
              className="flex items-start justify-around space-x-12 w-4/5 px-2 max-sm:flex-col max-sm:items-center space-y-4  container "
              key={index}
            >
              <Image
                src={imageUrl}
                alt={name}
                width={300}
                height={300}
                className="w-64"
              />
              <div className="">
                <div className="space-y-2">
                  <h1 className="text-3xl tracking-wider font-semibold">
                    {name}
                  </h1>
                  <p className="text-gray-600 font-bold text-lg ">#{price}</p>
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
      <article className="w-full flex flex-col items-center  border-t border-t-gray-300 mt-8 p-2 pt-8 md:p-6 ">
        <div className="container flex flex-col flex-center">
          <div className="flex space-x-20 text-gray-300 mb-4 max-sm:space-x-10">
            <button
              onClick={() => {
                setDescription(true);
                setAdditionalInfo(false);
                setReviews(false);
              }}
              className={`${description === true && "text-black font-bold"}`}
            >
              Description
            </button>
            <button
              onClick={() => {
                setAdditionalInfo(true);
                setDescription(false);
                setReviews(false);
              }}
              className={`${additionalInfo === true && "text-black font-bold"}`}
            >
              Additional Information
            </button>
            <button
              onClick={() => {
                setReviews(true);
                setAdditionalInfo(false);
                setDescription(false);
              }}
              className={`${reviews === true && "text-black font-bold"}`}
            >
              Review[5]
            </button>
          </div>
          {description && (
            <div className="text-gray-300 flex flex-col flex-center">
              <div className="mb-4">
                <p className="mb-2">
                  Embodying the raw, wayward spirit of rock ‘n’ roll, the
                  Kilburn portable active stereo speaker takes the unmistakable
                  look and sound of Marshall, unplugs the chords, and takes the
                  show on the road.
                </p>
                <p>
                  Weighing in under 7 pounds, the Kilburn is a lightweight piece
                  of vintage styled engineering. Setting the bar as one of the
                  loudest speakers in its class, the Kilburn is a compact,
                  stout-hearted hero with a well-balanced audio which boasts a
                  clear midrange and extended highs for a sound that is both
                  articulate and pronounced. The analogue knobs allow you to
                  fine tune the controls to your personal preferences while the
                  guitar-influenced leather strap enables easy and stylish
                  travel.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Image
                  src={"/images/Group 107.png"}
                  alt="Product description image"
                  width={300}
                  height={250}
                  className="w-40 md:w-60 lg:w-96"
                />
                <Image
                  src={"/images/Group 107.png"}
                  alt="Product description image"
                  width={300}
                  height={250}
                  className="w-40 md:w-60 lg:w-96"
                />
              </div>
            </div>
          )}
        </div>
      </article>
      {/* related products */}
      <article className="w-full flex flex-col items-center  border-t border-t-gray-300 mt-8 p-2 pt-8 md:p-6 ">
        <div className="container flex flex-col flex-center">
          <h2 className="text-xl font-semibold">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 space-x-1">
            {newData.slice(0, 4).map((product) => {
              return <ProductCard product={product} key={product._id} />;
            })}
          </div>
        </div>
      </article>
    </section>
  );
};

export default ProductDetails;

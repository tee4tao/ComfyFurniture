"use client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartProvider";
import {
  deleteSavedItems,
  getLoggedInUser,
  getSavedItems,
} from "@/lib/actions/users.action";
import Image from "next/image";
import React from "react";

const SavedItems = () => {
  const { savedItems, removeFromSavedItems, updateCart } = useCart();
  // todo: change the type of savedItem
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDeleteItem = async (savedItem: any) => {
    const loggedIn = await getLoggedInUser();
    const DBSavedItems = await getSavedItems(loggedIn?.$id);
    if (loggedIn) {
      deleteSavedItems(
        DBSavedItems.documents.find(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (dbItem: any) => dbItem.id === savedItem.product._id
        )!.$id
      );
    }
    removeFromSavedItems(savedItem.product);
  };
  return (
    <section className="w-screen flex flex-col flex-center">
      <div className="container md:max-w-[768px] flex flex-col flex-center">
        {savedItems.map((savedItem, index) => {
          return (
            <article
              className="w-full flex flex-col mb-8 shadow-md p-2 space-y-4"
              key={index}
            >
              <div className="flex items-center justify-start gap-8 border-b border-gray-300 pb-2">
                <Image
                  src={savedItem.product.imageUrl}
                  alt={savedItem.product.name}
                  width={50}
                  height={30}
                  className="object-cover w-20"
                />
                <div>
                  <h3 className="text-lg font-bold">
                    {savedItem.product.name}
                  </h3>
                  <p>{savedItem.product.details}</p>
                  <p className="font-semibold">${savedItem.product.price}</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-1 px-2">
                <button
                  className="text-primary"
                  onClick={() => onDeleteItem(savedItem)}
                >
                  Remove
                </button>
                <Button onClick={() => updateCart(savedItem.product, 1)}>
                  Add to Cart
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default SavedItems;

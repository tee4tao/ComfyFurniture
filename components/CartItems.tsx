"use client";
import { useCart } from "@/context/CartProvider";
import Image from "next/image";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { FiTrash } from "react-icons/fi";
import {
  createCart,
  deleteCartItem,
  updatCartItem,
} from "@/lib/actions/users.action";
import { cartBanner } from "@/constants";

const CartItems = ({
  loggedIn,
  DBCartItems,
}: {
  loggedIn: Record<string, string>;
  DBCartItems: {
    documents: {
      id: string;
      name: string;
      details: string;
      quantity: number;
      imageUrl: string;
      price: number;
      $id: string;
    }[];
  };
}) => {
  const {
    items: cartItems,
    removeFromCart,
    countTotalPrice,
    countAllItems,
  } = useCart();

  const router = useRouter();
  // console.log(loggedIn);

  const onCheckOut = async () => {
    if (loggedIn) {
      router.push("/checkout");
      // cartItems.map(async (cartItem) => {
      //   await createCart({
      //     ...cartItem,
      //     id: cartItem.product._id,
      //     name: cartItem.product.name,
      //     details: cartItem.product.details,
      //     quantity: cartItem.count,
      //     imageUrl: cartItem.product.imageUrl,
      //   });
      // });
      await Promise.all(
        cartItems.map(async (cartItem) => {
          const existingItem = DBCartItems.documents.find(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (dbItem: any) => dbItem.id === cartItem.product._id
          );

          if (existingItem) {
            // Check if there are differences
            const hasDifferences =
              existingItem.name !== cartItem.product.name ||
              existingItem.details !== cartItem.product.details ||
              existingItem.quantity !== cartItem.count ||
              existingItem.imageUrl !== cartItem.product.imageUrl;
            // console.log(hasDifferences);
            // console.log(existingItem.$id);

            if (hasDifferences) {
              // Update the existing item
              await updatCartItem({
                ...existingItem,
                itemId: existingItem.$id,
                user_id: loggedIn.$id,
                name: cartItem.product.name,
                details: cartItem.product.details,
                quantity: cartItem.count,
                imageUrl: cartItem.product.imageUrl,
                price: cartItem.product.price,
              });
            }
          } else {
            // Add a new item if it does not exist
            await createCart({
              id: cartItem.product._id,
              name: cartItem.product.name,
              details: cartItem.product.details,
              quantity: cartItem.count,
              imageUrl: cartItem.product.imageUrl,
              price: cartItem.product.price,
              user_id: loggedIn.$id,
            });
          }
        })
      );
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <section className="w-full mt-8 overflow-hidden">
      {countAllItems() === 0 ? (
        <article className="text-center mb-8">
          <h2 className="text-2xl font-semibold capitalize mb-6">
            Cart is empty
          </h2>
          <button
            className="border border-gray-500 rounded-xl hover:text-primary hover:border-primary transition-all ease-linear duration-300 max-sm:p-[0.1rem] max-sm:px-2 p-2 px-4"
            onClick={() => router.push("/shop")}
          >
            Continue Shopping
          </button>
        </article>
      ) : (
        <article className="flex flex-col md:flex-row flex-center md:justify-around md:items-start gap-4 px-10 mb-8 overflow-hidden">
          {/* Cart Table */}
          <Table className="overflow-hidden">
            <TableHeader className="bg-secondary">
              <TableRow className="text-base">
                <TableHead className=" text-center">Product</TableHead>
                <TableHead className="">Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="mt-8">
              {cartItems.map((cartItem) => (
                <TableRow key={cartItem.product._id}>
                  <TableCell className="font-medium flex flex-col md:flex-row gap-1 justify-center items-center ">
                    <Image
                      src={cartItem.product.imageUrl}
                      alt={cartItem.product.name}
                      width={80}
                      height={80}
                      priority={true}
                      className="rounded-md max-sm:w-10 h-20 "
                    />
                    <p className="md:text-lg">{cartItem.product.name}</p>
                  </TableCell>
                  <TableCell className="">#{cartItem.product.price}</TableCell>
                  <TableCell>{cartItem.count}</TableCell>
                  <TableCell className="text-right">
                    #{(cartItem.count * cartItem.product.price).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right ">
                    {/* 2222 */}
                    <button
                      onClick={async () => {
                        deleteCartItem(
                          DBCartItems.documents.find(
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (dbItem: any) => dbItem.id === cartItem.product._id
                          )!.$id
                        );
                        removeFromCart(cartItem.product);
                      }}
                    >
                      <FiTrash className="text-primary" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex flex-col flex-center bg-secondary w-[90%] md:w-96 p-2 h-fit">
            <h2 className="text-2xl font-semibold mb-8">Cart Totals</h2>
            <div className="flex items-center justify-around w-full mb-2">
              <p className="font-semibold">Subtotal</p>
              <p className="text-sm text-gray-300"># {countTotalPrice()}</p>
            </div>
            <div className="flex items-center justify-around w-full mb-6">
              <p className="font-semibold">Total</p>
              <p className="font-semibold text-primary">
                # {countTotalPrice()}
              </p>
            </div>
            <button
              className="border border-gray-500 rounded-xl hover:text-primary hover:border-primary transition-all ease-linear duration-300 max-sm:p-[0.1rem] max-sm:px-2 p-1 px-6"
              onClick={onCheckOut}
            >
              Checkout
            </button>
          </div>
        </article>
      )}

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
    </section>
  );
};

export default CartItems;

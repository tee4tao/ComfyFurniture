"use client";
import { Button } from "@/components/ui/button";
import {
  clearCart,
  getCart,
  getLoggedInUser,
} from "@/lib/actions/users.action";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PaymentSuccess({
  searchParams: { amount },
}: {
  searchParams: { amount: string };
}) {
  const router = useRouter();
  // const clearCartAfterPayment = async () => {
  //   const loggedIn = await getLoggedInUser();
  //   const DBCartItems = await getCart(loggedIn?.$id);
  //   const findId = DBCartItems.documents.map((item) => item.$id);
  //   clearCart(findId);
  // };
  // useEffect(() => {
  //   console.log("clearing cart");

  //   clearCartAfterPayment();
  // }, []);
  return (
    <section className="container mx-auto text-center mb-8">
      <div className="mb-10 flex flex-col flex-center px-10">
        <Image
          src={"/images/successful transaction1.gif"}
          alt=""
          width={100}
          height={100}
          priority={true}
          className="object-cover"
        />
        <div className="">
          <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
          <h2 className="text-2xl">
            Your payment is successful and your orders will be delivered very
            soon
          </h2>

          <div className="bg-white p-2 rounded-md text-primary mt-5 text-4xl font-bold">
            ${amount}
          </div>

          <Button
            className="text-white mt-4"
            onClick={() => router.push("/shop")}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </section>
  );
}

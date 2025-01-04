"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();
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
            Your order has been confirmed and it will be be delivered very soon
          </h2>

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
};

export default Page;

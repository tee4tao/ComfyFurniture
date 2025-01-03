"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PaymentSuccess({
  searchParams: { amount },
}: {
  searchParams: { amount: string };
}) {
  const router = useRouter();
  return (
    <section className="container mx-auto text-center">
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

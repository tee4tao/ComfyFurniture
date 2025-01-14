"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="flex  flex-center mt-16 gap-4">
      <Image src={"/images/error.png"} alt="error" width={100} height={100} />
      <div className="text-center">
        <h2 className="text-2xl font-bold">Oops! Page not found</h2>
        <p>Could not find requested resource</p>
        <Button className="text-white mt-4" onClick={() => router.push("/")}>
          Go Back Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

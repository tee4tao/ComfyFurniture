"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

type Props = {
  error: {
    message: string;
    error: string;
  };
};
const error = (error: Props) => {
  return (
    <div className="mb-8 flex items-center gap-10">
      <Image
        src={"/images/failed.png"}
        alt="fetch failed"
        width={100}
        height={100}
      />
      <div className="text-center space-y-4">
        <div className="">
          <h3 className="text-xl capitalize font-semibold">
            {error.error.message}!
          </h3>
          <p>Something went wrong</p>
        </div>
        <Button className="text-white" onClick={() => window.location.reload()}>
          Refresh
        </Button>
      </div>
    </div>
  );
};

export default error;

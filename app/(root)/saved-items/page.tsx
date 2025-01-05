import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const SavedItems = () => {
  return (
    <section className="w-screen flex flex-col flex-center">
      <div className="container md:max-w-[768px] flex flex-col flex-center">
        <article className="w-full flex flex-col mb-8 shadow-md p-2 space-y-4">
          <div className="flex items-center justify-center gap-8 border-b border-gray-300 pb-2">
            <Image
              src={"/images/Bedroom.png"}
              alt=""
              width={50}
              height={30}
              className="object-cover w-20"
            />
            <div>
              <h3 className="text-lg font-bold">Muggo</h3>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Suscipit, dolorum.
              </p>
              <p className="font-semibold">$310</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-1 px-2">
            <button className="text-primary">Remove</button>
            <Button>Add to Cart</Button>
          </div>
        </article>
        <article className="w-full flex flex-col mb-8 shadow-md p-2 space-y-4">
          <div className="flex items-center justify-center gap-8 border-b border-gray-300 pb-2">
            <Image
              src={"/images/Bedroom.png"}
              alt=""
              width={50}
              height={30}
              className="object-cover w-20"
            />
            <div>
              <h3 className="text-lg font-bold">Muggo</h3>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Suscipit, dolorum.
              </p>
              <p className="font-semibold">$310</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button className="text-primary">Remove</button>
            <Button>Add to Cart</Button>
          </div>
        </article>
        <article className="w-full flex flex-col  shadow-md p-2 space-y-4">
          <div className="flex items-center justify-center gap-8 border-b border-gray-300 pb-2">
            <Image
              src={"/images/Bedroom.png"}
              alt=""
              width={50}
              height={30}
              className="object-cover w-20"
            />
            <div>
              <h3 className="text-lg font-bold">Muggo</h3>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Suscipit, dolorum.
              </p>
              <p className="font-semibold">$310</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button className="text-primary">Remove</button>
            <Button>Add to Cart</Button>
          </div>
        </article>
      </div>
    </section>
  );
};

export default SavedItems;

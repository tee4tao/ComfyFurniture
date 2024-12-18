import Image from "next/image";
import { setupImages } from "@/constants";

const Setup = () => {
  return (
    <section className="container flex flex-col items-center px-2">
      <div className="flex flex-col items-center mb-4">
        <p className="text-gray-600 text-sm">Share your setup with</p>
        <h2 className="text-2xl font-bold tracking-wider">#ComfyFurniture</h2>
      </div>
      <div className=" gap-5 lg:gap-8 columns-2 md:columns-3 lg:columns-4 [&>img:not(:first-child)]:mt-5 md:[&>img:not(:first-child)]:mt-8">
        {setupImages.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt="setup images"
            width={200}
            height={200}
            priority={true}
            className="object-cover w-full"
          />
        ))}
      </div>
    </section>
  );
};

export default Setup;

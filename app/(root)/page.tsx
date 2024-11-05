import Hero from "@/components/Hero";
import HomePageMotion from "@/components/HomePageMotion";
import OurProducts from "@/components/OurProducts";
import ProductRange from "@/components/ProductRange";
import Setup from "@/components/Setup";

import { client } from "@/lib/sanity";

async function getData() {
  const query = `*[_type == 'product']{
    name,
      _id,
      slug,
      price,
      details,
      "imageUrl": image.asset->url
  }`;

  const data = await client.fetch(query);
  return data;
}

const page = async () => {
  const data: product[] = await getData();

  return (
    <div className="w-full flex flex-col items-center space-y-8 mb-4 ">
      <Hero />
      <ProductRange />
      <OurProducts data={data} />
      <HomePageMotion />
      <Setup />
    </div>
  );
};

export default page;

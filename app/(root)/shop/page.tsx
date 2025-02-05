import PageBanner from "@/components/PageBanner";
import ShopProducts from "@/components/ShopProducts";

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

const Shop = async () => {
  const data: product[] = await getData();
  return (
    <div className="w-full flex flex-col flex-center mb-8">
      <PageBanner />
      <ShopProducts data={data} />
    </div>
  );
};

export default Shop;

import ProductDetails from "@/components/ProductDetails";
import { client } from "@/lib/sanity";

async function getData() {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
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

type Props = {
  params: {
    slug: string;
  };
};
// console.log(getData());

const page = async ({ params: { slug } }: Props) => {
  const data: product[] = await getData();
  // console.log(Boolean(data));

  if (!data) {
    <div>loading</div>;
  }

  return (
    <div className="w-full flex flex-col flex-center mb-8">
      <ProductDetails data={data} slug={slug} />
    </div>
  );
};

export default page;

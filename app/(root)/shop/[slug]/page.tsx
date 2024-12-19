import ProductDetails from "@/components/ProductDetails";
import { client } from "@/lib/sanity";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getLoggedInUser } from "@/lib/actions/users.action";

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
  const loggedIn = await getLoggedInUser();

  const data: product[] = await getData();
  // console.log(Boolean(data));

  if (!data) {
    <div>loading</div>;
  }

  return (
    <div className="w-screen flex flex-col flex-center mb-8">
      <div className="w-full flex justify-center bg-secondary py-4 mb-8">
        <Breadcrumb className="pl-4 container">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="font-semibold capitalize">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/shop" className="text-gray-600 capitalize">
                shop
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-600 capitalize">
                {slug}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <ProductDetails data={data} slug={slug} loggedIn={loggedIn} />
    </div>
  );
};

export default page;

import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const ShopBanner = () => {
  return (
    <section className="w-full">
      <div className="relative w-full flex justify-center items-center">
        <Image
          src={"/images/Rectangle 1.png"}
          alt="shop-banner"
          width={1000}
          height={100}
          className="w-screen object-cover"
        />
        <div className="absolute text-center">
          <h2 className="text-2xl font-semibold mb-1 lg:text-4xl">Shop</h2>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="font-semibold">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-gray-600">shop</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </section>
  );
};

export default ShopBanner;

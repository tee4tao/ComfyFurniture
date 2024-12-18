"use client";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

const PageBanner = () => {
  const path = usePathname();

  return (
    <section className="w-full">
      <div className="relative w-full flex justify-center items-center">
        <Image
          src={"/images/Rectangle 1.png"}
          alt="shop-banner"
          width={1000}
          height={100}
          priority={true}
          className="w-screen object-cover"
        />
        <div className="absolute text-center">
          {/* logo */}
          <Image
            src={"../icons/logo.svg"}
            alt="ComfyFurniture Logo"
            width={10}
            height={10}
            className="inline-block w-6"
          />
          <h2 className="text-2xl font-semibold lg:text-4xl capitalize">
            {path.slice(1)}
          </h2>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="font-semibold">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-gray-600 capitalize">
                  {path.slice(1)}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </section>
  );
};

export default PageBanner;

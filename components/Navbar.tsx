import { iconLinks, pageLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import MobileNav from "./MobileNav";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-2xl w-full p-2 md:p-6 flex justify-center">
      <div className="container flex items-center justify-between">
        <Link href={"/"}>
          <div className="flex items-center">
            <Image
              src={"./icons/logo.svg"}
              alt="ComfyFurniture Logo"
              width={30}
              height={30}
            />

            <h1 className="font-bold text-xl">ComfyFurniture</h1>
          </div>
        </Link>
        <div className="flex space-x-4 max-md:hidden">
          {pageLinks.map((link, index) => (
            <Link key={index} href={link.url} className="text-gray-600">
              {link.page}
            </Link>
          ))}
        </div>
        <div className="flex space-x-4 max-md:hidden">
          {iconLinks.map((link, index) => (
            <Link key={index} href={link.url} className="text-gray-600">
              <Image src={link.icon} alt={link.url} width={20} height={20} />
            </Link>
          ))}
        </div>
        {/* mobile nav */}

        {/* cart */}
        <div className="hidden max-md:block">
          <Link href={"/cart"} className="text-gray-600">
            <Image
              src="./icons/ant-design_shopping-cart-outlined.svg"
              alt="cart"
              width={25}
              height={25}
            />
          </Link>
        </div>
        {/* Hamburger */}
        <div className="hidden max-md:block">
          <MobileNav />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

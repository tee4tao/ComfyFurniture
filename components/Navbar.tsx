"use client";
import { iconLinks, pageLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import MobileNav from "./MobileNav";
import { useCart } from "@/context/CartProvider";
import { motion } from "framer-motion";

const Navbar = () => {
  const { countAllItems } = useCart();
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-white shadow-2xl w-full p-2 md:p-6 flex justify-center"
    >
      <div className="container flex items-center justify-between">
        <Link href={"/"}>
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex items-center"
          >
            <Image
              src={"../icons/logo.svg"}
              alt="ComfyFurniture Logo"
              width={30}
              height={30}
            />

            <h1 className="font-bold text-xl">ComfyFurniture</h1>
          </motion.div>
        </Link>
        <div className="flex space-x-4 max-md:hidden">
          {pageLinks.map((link, index) => (
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: link.delay, duration: 0.3 }}
              key={index}
            >
              <Link href={link.url} className="text-gray-600">
                {link.page}
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="flex space-x-4 max-md:hidden">
          {iconLinks.map((link, index) => (
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: link.delay, duration: 0.3 }}
              key={index}
            >
              <Link href={link.url} className="text-gray-600 relative">
                <Image src={link.icon} alt={link.url} width={20} height={20} />
                {link.url === "/cart" && (
                  <div className="bg-primary text-white rounded-full p-[0.1rem] px-2 text-sm absolute -top-2 -right-4">
                    {countAllItems() > 9 ? `9+` : countAllItems()}
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
        {/* mobile nav */}

        {/* cart */}
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.3 }}
          className="hidden max-md:block"
        >
          <Link href={"/cart"} className="text-gray-600 relative">
            <Image
              src="../icons/ant-design_shopping-cart-outlined.svg"
              alt="cart"
              width={25}
              height={25}
            />
            <div className="bg-primary text-white rounded-full p-[0.1rem] px-2 text-sm absolute -top-2 -right-4">
              {countAllItems() > 9 ? `9+` : countAllItems()}
            </div>
          </Link>
        </motion.div>
        {/* Hamburger */}
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.3 }}
          className="hidden max-md:block"
        >
          <MobileNav countAllItems={countAllItems()} />
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;

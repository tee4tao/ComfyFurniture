import { useCart } from "@/context/CartProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface CartItemsOverlayProps {
  showCartItems: boolean;
  setShowCartItems: React.Dispatch<React.SetStateAction<boolean>>;
  loggedIn: unknown;
}

const CartItemsOverlay = ({
  showCartItems,
  setShowCartItems,
  loggedIn,
}: CartItemsOverlayProps) => {
  const { items: cartItems, removeFromCart, countTotalPrice } = useCart();

  const router = useRouter();

  const onCheckOut = () => {
    if (loggedIn) {
      router.push("/checkout");
    } else {
      router.push("/sign-in");
    }
  };

  console.log(loggedIn);

  return (
    <div>
      {showCartItems && (
        <div className="absolute top-0 right-0 max-sm:w-[15rem] w-[25rem] z-50 bg-white p-2 md:px-4  transition-all ease-linear duration-1000">
          {/* header */}
          <div className="flex justify-between items-center border-b border-b-gray-300 mb-4 pb-4">
            <h2 className="capitalize font-bold text-2xl">shopping cart</h2>
            <button onClick={() => setShowCartItems(false)}>
              <Image
                src={"../icons/Group.svg"}
                alt="close button"
                width={10}
                height={10}
                className=""
              />
            </button>
          </div>
          {/* cart items */}
          {cartItems.map((cartItem) => {
            return (
              <div className="mb-12" key={cartItem.product._id}>
                <div className="flex items-center justify-between mb-4">
                  <Image
                    src={cartItem.product.imageUrl}
                    alt={cartItem.product.name}
                    width={80}
                    height={80}
                    priority={true}
                    className="rounded-md max-sm:w-20 h-20"
                  />
                  <div className="space-y-2">
                    <p className="text-lg">{cartItem.product.name}</p>
                    <p className="flec items-center md:space-x-4 max-sm:space-x-1">
                      <span>{cartItem.count}</span> <span>x</span>{" "}
                      <span className="text-primary text-sm font-semibold">
                        #{cartItem.product.price.toFixed(2)}
                      </span>
                    </p>
                  </div>
                  <button onClick={() => removeFromCart(cartItem.product)}>
                    <Image
                      src={"../icons/Vector.svg"}
                      alt="remove item button"
                      width={10}
                      height={10}
                      className=""
                    />
                  </button>
                </div>
              </div>
            );
          })}
          {/* <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <Image
                src={"/images/Rectangle 38.png"}
                alt=""
                width={80}
                height={80}
                className="rounded-md max-sm:w-20"
              />
              <div className="space-y-2">
                <p className="text-lg">Asgaard sofa</p>
                <p className="flec items-center md:space-x-4 max-sm:space-x-1">
                  <span>1</span> <span>x</span>{" "}
                  <span className="text-primary text-sm font-semibold">
                    #20,000.00
                  </span>
                </p>
              </div>
              <Image
                src={"../icons/Vector.svg"}
                alt="remove item button"
                width={10}
                height={10}
                className=""
              />
            </div>
          </div> */}
          {/* subtotal */}
          <div className="flex items-center justify-between border-b border-b-gray-300 pb-4 mb-8">
            <p className="font-semibold">Subtotal</p>
            <p className="text-primary font-semibold">#{countTotalPrice()}</p>
          </div>
          {/* buttons */}
          <div className="flex items-center justify-between gap-1 max-sm:text-sm mb-4">
            <button
              className="border rounded-full hover:text-primary transition-all ease-linear duration-300 max-sm:p-[0.1rem] max-sm:px-2 p-1 px-6"
              onClick={() => router.push("/cart")}
            >
              Cart
            </button>
            <button
              className="border rounded-full hover:text-primary transition-all ease-linear duration-300 max-sm:p-[0.1rem] max-sm:px-2 p-1 px-6"
              onClick={onCheckOut}
            >
              Checkout
            </button>
            <button className="border rounded-full hover:text-primary transition-all ease-linear duration-300 max-sm:p-[0.1rem] max-sm:px-2 p-1 px-6">
              Comparison
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItemsOverlay;

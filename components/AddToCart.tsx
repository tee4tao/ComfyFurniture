import { useCart } from "@/context/CartProvider";
// import {
//   deleteArticles,
//   getCart,
//   getLoggedInUser,
// } from "@/lib/actions/users.action";
import React, { FC } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

interface Props {
  product: product;
  setShowCartItems: React.Dispatch<React.SetStateAction<boolean>>;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const AddToCart: FC<Props> = ({
  product,
  setShowCartItems,
  quantity,
  setQuantity,
}) => {
  const { updateCart } = useCart();

  const onAddToCartClick = () => {
    updateCart(product, quantity);
    setShowCartItems(true);
  };

  return (
    <div className="flex items-center space-x-2">
      {/* quantity button */}
      <div className="flex items-center justify-between border border-gray-300 rounded px-2 py-1 space-x-2">
        <FiMinus
          className="cursor-pointer hover:text-primary"
          onClick={() => {
            setQuantity(quantity - 1);
            // removeFromCart(product, quantity);
            if (quantity === 1) {
              setQuantity(1);
            }
          }}
        />
        <p>{quantity}</p>
        <FiPlus
          className="cursor-pointer hover:text-primary"
          onClick={() => {
            setQuantity(quantity + 1);
            // addToCart(product, quantity);
          }}
        />
      </div>
      {/* add to cart button */}
      <button
        className="border border-gray-300 rounded px-2 py-1 text-nowrap capitalize hover:text-primary"
        onClick={onAddToCartClick}
      >
        add to cart
      </button>
      {/* compare button */}
      <button className="flex items-center justify-between border border-gray-300 rounded px-2 py-1 hover:text-primary">
        <FiPlus />
        <p>Compare</p>
      </button>
    </div>
  );
};

export default AddToCart;

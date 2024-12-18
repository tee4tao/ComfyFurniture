import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type cartItem = {
  product: product;
  count: number;
};

interface CartContext {
  items: cartItem[];
  updateCart(product: product, qty: number): void;
  removeFromCart(product: product): void;
  countAllItems(): number;
  countTotalPrice(): number;
}

const updateCartInLS = (products: cartItem[]) => {
  localStorage.setItem("cartItems", JSON.stringify(products));
};

const CartContext = createContext<CartContext>({
  items: [],
  updateCart() {},
  removeFromCart() {},
  countAllItems() {
    return 0;
  },
  countTotalPrice() {
    return 0;
  },
});

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<cartItem[]>([]);

  const removeFromCart = (product: product) => {
    const newProducts = cartItems.filter(
      (item) => item.product._id !== product._id
    );
    setCartItems(newProducts);
    updateCartInLS(newProducts);
  };

  const updateCart = (product: product, qty: number) => {
    const finalCartItems = [...cartItems];
    const index = cartItems.findIndex(
      (item) => product._id === item.product._id
    );

    if (index === -1) {
      finalCartItems.push({ count: qty, product });
    } else {
      finalCartItems[index].count = qty;
    }

    setCartItems(finalCartItems);
    updateCartInLS(finalCartItems);
  };
  // const removeFromCart = (product: product, qty: number) => {
  //   const newProducts = cartItems.map((item) => {
  //     if (product._id === item.product._id) {
  //       item.count = qty;
  //     }

  //     return item;
  //   });

  //   setCartItems(newProducts);
  // };

  const countAllItems = () => {
    return cartItems.reduce((total, cartItem) => total + cartItem.count, 0);
  };
  const countTotalPrice = () => {
    return cartItems
      .reduce(
        (total, cartItem) => total + cartItem.product.price * cartItem.count,
        0
      )
      .toFixed(2);
  };

  useEffect(() => {
    const result = localStorage.getItem("cartItems");
    if (result !== null) {
      setCartItems(JSON.parse(result));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        items: cartItems,
        updateCart,
        removeFromCart,
        countAllItems,
        countTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);

import {
  createCart,
  getCart,
  getLoggedInUser,
  updatCartItem,
} from "@/lib/actions/users.action";
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

const loggedIn = async () => {
  const user = await getLoggedInUser();
  return user;
};
// console.log(loggedIn().then((res) => console.log(res)));

// To update the cart in the local storage or database if user exists.
const updateCartInLS = async (products: cartItem[]) => {
  const loggedIn = await getLoggedInUser();
  const DBCartItems = await getCart();
  if (loggedIn) {
    products.map(async (cartItem) => {
      const existingItem = DBCartItems.documents.find(
        (dbItem: any) => dbItem.id === cartItem.product._id
      );

      if (existingItem) {
        // Check if there are differences
        const hasDifferences =
          existingItem.name !== cartItem.product.name ||
          existingItem.details !== cartItem.product.details ||
          existingItem.quantity !== cartItem.count ||
          existingItem.imageUrl !== cartItem.product.imageUrl;
        // console.log(hasDifferences);
        // console.log(existingItem.$id);

        if (hasDifferences) {
          // Update the existing item
          await updatCartItem({
            ...existingItem,
            itemId: existingItem.$id,
            name: cartItem.product.name,
            details: cartItem.product.details,
            quantity: cartItem.count,
            imageUrl: cartItem.product.imageUrl,
            price: cartItem.product.price,
          });
        }
      } else {
        // Add a new item if it does not exist
        await createCart({
          id: cartItem.product._id,
          name: cartItem.product.name,
          details: cartItem.product.details,
          quantity: cartItem.count,
          imageUrl: cartItem.product.imageUrl,
          price: cartItem.product.price,
        });
      }
    });
  } else {
    localStorage.setItem("cartItems", JSON.stringify(products));
  }
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
    const hasUser = async () => {
      const user = await loggedIn();
      if (user) {
        const DBCartItems = await getCart();
        setCartItems(
          DBCartItems.documents.map((item: any) => ({
            product: {
              _id: item.id,
              name: item.name,
              details: item.details,
              price: item.price,
              imageUrl: item.imageUrl,
            },
            count: item.quantity,
          }))
          // DBCartItems.documents
        );
      } else {
        const result = localStorage.getItem("cartItems");
        if (result !== null) {
          setCartItems(JSON.parse(result));
        }
      }
    };

    hasUser();
    // const result = localStorage.getItem("cartItems");
    // if (result !== null) {
    //   setCartItems(JSON.parse(result));
    // }
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

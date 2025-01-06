import {
  createCart,
  createSavedItems,
  getCart,
  getLoggedInUser,
  getSavedItems,
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
type savedItem = {
  product: product;
};

interface CartContext {
  items: cartItem[];
  savedItems: savedItem[];
  updateCart(product: product, qty: number): void;
  updateSavedItems(product: product): void;
  removeFromCart(product: product): void;
  removeFromSavedItems(product: product): void;
  countAllItems(): number;
  countTotalPrice(): number;
}

const loggedIn = async () => {
  const user = await getLoggedInUser();
  return user;
};

// CART

// To update the cart in the local storage or database if user exists.
const updateCartInLS = async (products: cartItem[]) => {
  const loggedIn = await getLoggedInUser();
  const DBCartItems = await getCart(loggedIn?.$id);
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
          user_id: loggedIn.$id,
        });
      }
    });
  } else {
    localStorage.setItem("cartItems", JSON.stringify(products));
  }
};

// To update the cart in the local storage or database if user exists.
const updateSavedItemsInLS = async (products: savedItem[]) => {
  const loggedIn = await getLoggedInUser();
  const DBSavedItems = await getSavedItems(loggedIn?.$id);
  if (loggedIn) {
    products.map(async (cartItem) => {
      const existingItem = DBSavedItems.documents.find(
        (dbItem: any) => dbItem.id === cartItem.product._id
      );

      if (existingItem) {
        return;
      } else {
        // Add a new item if it does not exist
        await createSavedItems({
          id: cartItem.product._id,
          name: cartItem.product.name,
          details: cartItem.product.details,
          imageUrl: cartItem.product.imageUrl,
          price: cartItem.product.price,
          user_id: loggedIn.$id,
        });
      }
    });
  } else {
    localStorage.setItem("savedItems", JSON.stringify(products));
  }
};

const CartContext = createContext<CartContext>({
  items: [],
  savedItems: [],
  updateSavedItems() {},
  updateCart() {},
  removeFromCart() {},
  removeFromSavedItems() {},
  countAllItems() {
    return 0;
  },
  countTotalPrice() {
    return 0;
  },
});

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<cartItem[]>([]);
  const [savedItems, setSavedItems] = useState<savedItem[]>([]);
  // console.log(savedItems);

  const removeFromCart = (product: product) => {
    const newProducts = cartItems.filter(
      (item) => item.product._id !== product._id
    );
    setCartItems(newProducts);
    updateCartInLS(newProducts);
  };
  const removeFromSavedItems = (product: product) => {
    const newProducts = savedItems.filter(
      (item) => item.product._id !== product._id
    );
    setSavedItems(newProducts);
    updateSavedItemsInLS(newProducts);
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

  // saved items
  const updateSavedItems = (product: product) => {
    const finalCartItems = [...savedItems];
    const index = savedItems.findIndex(
      (item) => product._id === item.product._id
    );

    if (index === -1) {
      finalCartItems.push({ product });
    } else {
      return;
    }

    setSavedItems(finalCartItems);
    updateSavedItemsInLS(finalCartItems);
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
    return cartItems.reduce(
      (total, cartItem) => total + cartItem.product.price * cartItem.count,
      0
    );
  };

  useEffect(() => {
    const hasUser = async () => {
      const user = await loggedIn();
      if (user) {
        const DBCartItems = await getCart(user.$id);
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
        const DBSavedItems = await getSavedItems(user.$id);
        setSavedItems(
          DBSavedItems.documents.map((item: any) => ({
            product: {
              _id: item.id,
              name: item.name,
              details: item.details,
              price: item.price,
              imageUrl: item.imageUrl,
            },
          }))
        );
      } else {
        const cartResult = localStorage.getItem("cartItems");
        const savedItemsResult = localStorage.getItem("savedItems");
        if (cartResult !== null) {
          setCartItems(JSON.parse(cartResult));
        }
        if (savedItemsResult !== null) {
          setSavedItems(JSON.parse(savedItemsResult));
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
        savedItems: savedItems,
        updateSavedItems,
        updateCart,
        removeFromCart,
        removeFromSavedItems,
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

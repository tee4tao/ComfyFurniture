"use client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartProvider";
import {
  deleteSavedItems,
  getLoggedInUser,
  getSavedItems,
} from "@/lib/actions/users.action";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";

const SavedItems = () => {
  const { savedItems, removeFromSavedItems, updateCart } = useCart();
  const router = useRouter();

  interface SavedItem {
    product: {
      _id: string;
      imageUrl: string;
      name: string;
      details: string;
      slug: { current: string; _type: string };
      price: number;
    };
  }

  const onDeleteItem = async (savedItem: SavedItem) => {
    const loggedIn = await getLoggedInUser();
    const DBSavedItems = await getSavedItems(loggedIn?.$id);
    if (loggedIn) {
      deleteSavedItems(
        DBSavedItems.documents.find(
          (dbItem: { id: string }) => dbItem.id === savedItem.product._id
        )!.$id
      );
    }
    removeFromSavedItems(savedItem.product);
  };
  return (
    <div className="w-screen flex flex-col flex-center">
      {savedItems.length === 0 ? (
        <section className="flex flex-col flex-center mt-4 mb-8 space-y-4 px-2">
          <FaHeart className=" text-white bg-primary rounded-full p-3 w-20 h-20" />
          <h2 className="text-2xl font-bold">No Saved Item</h2>
          <p>
            Found something you like? Tap on the heart icon to add it to your
            wishlist! All your saved items will appear here.
          </p>
          <button
            className="border border-gray-500 rounded-xl hover:text-primary hover:border-primary transition-all ease-linear duration-300 max-sm:p-[0.1rem] max-sm:px-2 p-2 px-4"
            onClick={() => router.push("/shop")}
          >
            Continue Shopping
          </button>
        </section>
      ) : (
        <section className="container md:max-w-[768px] flex flex-col flex-center mt-4">
          <h2 className="text-center text-2xl mb-4 font-semibold border-b border-primary pb-2">
            Saved Items.
          </h2>

          {savedItems.map((savedItem, index) => {
            return (
              <div
                className="w-full flex flex-col mb-8 shadow-md p-2 space-y-4"
                key={index}
              >
                <div className="flex items-center justify-start gap-8 border-b border-gray-300 pb-2">
                  <Image
                    src={savedItem.product.imageUrl}
                    alt={savedItem.product.name}
                    width={50}
                    height={30}
                    className="object-cover w-20"
                  />
                  <div>
                    <h3 className="text-lg font-bold">
                      {savedItem.product.name}
                    </h3>
                    <p>{savedItem.product.details}</p>
                    <p className="font-semibold">${savedItem.product.price}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-1 px-2">
                  <button
                    className="text-primary"
                    onClick={() => onDeleteItem(savedItem)}
                  >
                    Remove
                  </button>
                  <Button onClick={() => updateCart(savedItem.product, 1)}>
                    Add to Cart
                  </Button>
                </div>
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
};

export default SavedItems;

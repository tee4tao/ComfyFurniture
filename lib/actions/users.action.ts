"use server";

import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "../appwrite";
import { ID, Permission, Query, Role } from "node-appwrite";
import { parseStringify } from "../utils";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_CART_COLLECTION_ID: CART_COLLECTION_ID,
  APPWRITE_SAVED_ITEMS_COLLECTION_ID: SAVED_ITEMS_COLLECTION_ID,
} = process.env;

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();
    const response = await account.createEmailPasswordSession(email, password);
    return parseStringify(response);
  } catch (error) {
    console.error("Error", error);
  }
};
export const signUp = async (userData: SignUpParams) => {
  const { email, password } = userData;
  try {
    const { account } = await createAdminClient();
    const newUserAccount = await account.create(ID.unique(), email, password);
    const session = await account.createEmailPasswordSession(email, password);
    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      expires: new Date(session.expire),
    });
    return parseStringify(newUserAccount);
  } catch (error) {
    console.error("Error", error);
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();

    return parseStringify(user);
  } catch (error) {
    console.log(error);
    return null;
  }
}

// cart database

export const createCart = async ({
  id,
  name,
  details,
  quantity,
  imageUrl,
  price,
  user_id,
}: createCartProps) => {
  try {
    const { database } = await createAdminClient();

    const cart = await database.createDocument(
      DATABASE_ID!,
      CART_COLLECTION_ID!,
      ID.unique(),
      {
        id,
        name,
        details,
        quantity,
        imageUrl,
        price,
        user_id,
      },
      [
        Permission.read(Role.user(user_id!)),
        Permission.update(Role.user(user_id!)),
        Permission.delete(Role.user(user_id!)),
        Permission.write(Role.user(user_id!)),
      ]
    );

    return parseStringify(cart);
  } catch (error) {
    console.log(error);
  }
};
export const getCart = async (user_id: string) => {
  try {
    const { database } = await createAdminClient();

    const cart = await database.listDocuments(
      DATABASE_ID!,
      CART_COLLECTION_ID!,
      [Query.equal("user_id", user_id)]
    );
    // console.log(cart.documents);

    return parseStringify(cart);
  } catch (error) {
    console.log(error);
  }
};
export const updatCartItem = async ({
  itemId,
  id,
  name,
  details,
  quantity,
  imageUrl,
  price,
}: createCartProps) => {
  try {
    const { database } = await createAdminClient();

    const cart = await database.updateDocument(
      DATABASE_ID!,
      CART_COLLECTION_ID!,
      itemId!,
      {
        // itemId,
        id,
        name,
        details,
        quantity,
        imageUrl,
        price,
      }
    );
    // console.log(cart.documents);

    return parseStringify(cart);
  } catch (error) {
    console.log(error);
  }
};
export const deleteCartItem = async (itemId: string) => {
  try {
    const { database } = await createAdminClient();

    await database.deleteDocument(DATABASE_ID!, CART_COLLECTION_ID!, itemId!);
  } catch (error) {
    console.log(error);
  }
};

// saved items DB

export const createSavedItems = async ({
  id,
  name,
  details,
  imageUrl,
  price,
  user_id,
}: createSavedItemsProps) => {
  try {
    const { database } = await createAdminClient();

    const cart = await database.createDocument(
      DATABASE_ID!,
      SAVED_ITEMS_COLLECTION_ID!,
      ID.unique(),
      {
        id,
        name,
        details,
        imageUrl,
        price,
        user_id,
      },
      [
        Permission.read(Role.user(user_id!)),
        Permission.update(Role.user(user_id!)),
        Permission.delete(Role.user(user_id!)),
        Permission.write(Role.user(user_id!)),
      ]
    );

    return parseStringify(cart);
  } catch (error) {
    console.log(error);
  }
};

export const getSavedItems = async (user_id: string) => {
  try {
    const { database } = await createAdminClient();

    const savedItems = await database.listDocuments(
      DATABASE_ID!,
      SAVED_ITEMS_COLLECTION_ID!,
      [Query.equal("user_id", user_id)]
    );
    // console.log(cart.documents);

    return parseStringify(savedItems);
  } catch (error) {
    console.log(error);
  }
};

export const deleteSavedItems = async (itemId: string) => {
  try {
    const { database } = await createAdminClient();

    await database.deleteDocument(
      DATABASE_ID!,
      SAVED_ITEMS_COLLECTION_ID!,
      itemId!
    );
  } catch (error) {
    console.log(error);
  }
};

// test

export const clearCart = async (documentIds: [string]) => {
  const batchSize = 10;
  const totalBatches = Math.ceil(documentIds.length / batchSize);
  const { database } = await createAdminClient();

  for (let i = 0; i < totalBatches; i++) {
    const start = i * batchSize;
    const end = start + batchSize;
    const batchIds = documentIds.slice(start, end);

    const promises = batchIds.map((id) => {
      return database.deleteDocument(DATABASE_ID!, CART_COLLECTION_ID!, id);
    });

    await Promise.all(promises);
  }
};

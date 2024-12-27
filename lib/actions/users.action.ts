"use server";

import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "../appwrite";
import { ID } from "node-appwrite";
import { parseStringify } from "../utils";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_CART_COLLECTION_ID: CART_COLLECTION_ID,
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

export const createCart = async ({
  id,
  name,
  details,
  quantity,
  imageUrl,
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
      }
    );

    return parseStringify(cart);
  } catch (error) {
    console.log(error);
  }
};
export const getCart = async () => {
  try {
    const { database } = await createAdminClient();

    const cart = await database.listDocuments(
      DATABASE_ID!,
      CART_COLLECTION_ID!
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

import { createClient } from "next-sanity";

export const client = createClient({
  // projectId: "edd9co9r",
  projectId: "g9j3dmfa",
  dataset: "production",
  apiVersion: "2022-03-07",
  // apiVersion: "2024-01-01",
  useCdn: true,
});

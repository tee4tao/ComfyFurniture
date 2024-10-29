import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "g9j3dmfa",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

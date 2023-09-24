import { createClient } from "next-sanity";

import { API_VERSION, DATASET, PROJECT_ID } from "@/config/sanity";

export const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  useCdn: true,
});

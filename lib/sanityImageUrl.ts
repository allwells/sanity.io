import { client } from "@/lib/sanity";

import ImageUrlBuilder from "@sanity/image-url";

const builder = ImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

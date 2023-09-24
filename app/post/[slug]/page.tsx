import { PortableText } from "@portabletext/react";

import { client } from "@/lib/sanity";
import Post from "@/lib/interfaces/post";

import { convertToWords } from "@/utils/formatDateInWords";
import Image from "next/image";
import { urlFor } from "@/lib/sanityImageUrl";

async function fetchPosts(slug: string) {
  const query = `*[_type == "post" && slug.current == "${slug}"][0]`;
  const data = await client.fetch(query);

  return data as Post;
}

export default async function SinglePost({
  params,
}: {
  params: { slug: string };
}) {
  const post: Post = await fetchPosts(params.slug);

  const date: string = new Date(post._createdAt).toISOString().split("T")[0];
  const convertedDate: string = convertToWords(date);

  const PortableTextComponent = {
    types: {
      image: ({ value }: { value: any }) => (
        <Image
          alt="image"
          width={700}
          height={500}
          src={urlFor(value).url()}
          className="rounded-lg object-cover object-center w-full h-auto"
        />
      ),
    },
  };

  return (
    <div className="w-full mt-10">
      <div className="space-y-2 pb-6 xs:border-b border-neutral-200 dark:border-neutral-700 mb-8 md:space-y-5 w-full">
        <h1 className="text-3xl mx-auto font-extrabold leading-9 tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl md:text-5xl w-fit text-center">
          {post.title}
        </h1>

        <p className="xs:text-base text-sm font-medium uppercase text-primary mx-auto w-fit">
          {convertedDate}
        </p>
      </div>

      <div className="w-full mx-auto prose max-w-none pb-28 dark:prose-invert prose-lg">
        <PortableText value={post.content} components={PortableTextComponent} />
      </div>
    </div>
  );
}

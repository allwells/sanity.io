import { client } from "@/lib/sanity";
import Post from "@/lib/interfaces/post";

import Article from "@/components/Article";

async function fetchPosts() {
  const query = `*[_type == "post"]`;

  const data = await client.fetch(query);

  return data as Post[];
}

export default async function Home() {
  const posts = await fetchPosts();

  return (
    <div className="w-full mt-6 divide-y divide-neutral-200 dark:divide-neutral-700">
      <div className="space-y-2 mb-8 md:space-y-5 w-full">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl sm:leading-10 md:text-5xl lg:text-6xl">
          All Posts
        </h1>
      </div>

      <div className="grid lg:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-5 pt-8">
        {posts.map((post: Post) => {
          return <Article key={post._id} {...post} />;
        })}
      </div>
    </div>
  );
}

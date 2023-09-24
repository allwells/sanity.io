import Link from "next/link";

import Post from "@/lib/interfaces/post";

import { formatDateInWords } from "@/utils/formatDateInWords";

export default function Article(props: Post) {
  const date: Date = new Date(props._createdAt);
  const converted_date: string = formatDateInWords(date);

  return (
    <Link
      href={`/post/${props.slug.current}`}
      className="border border-neutral-200 hover:border-primary dark:hover:border-primary max-w-md dark:border-neutral-800 duration-300 rounded-lg p-4 flex flex-col justify-start items-start"
    >
      <h1 className="sm:text-2xl text-xl tracking-tight font-medium text-primary">
        {props.title}
      </h1>

      <p className="text-sm font-normal text-neutral-400 mt-2">
        {converted_date}
      </p>

      <p className="xs:text-lg tracking-wide text-base mt-4 font-light text-neutral-600 dark:text-neutral-300 line-clamp-3">
        {props.overview}
      </p>
    </Link>
  );
}

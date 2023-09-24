import Link from "next/link";
import ThemeButton from "./ThemeButton";

export default function Header() {
  return (
    <nav className="w-full">
      <div className="py-5 mx-auto w-full max-w-5xl px-[4%] flex justify-between items-center">
        <Link href="/" className="font-bold text-3xl">
          <span className="text-primary">Sanity</span>.io
        </Link>

        <ThemeButton />
      </div>
    </nav>
  );
}

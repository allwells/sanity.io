import "@/styles/globals.css";

import clsx from "clsx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ThemeProviders from "@/providers/ThemeProviders";

import Header from "@/components/Header";
import SmoothScroll from "@/lib/SmoothScroll";
import TransitionLayout from "@/components/TransitionLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sanity.io Blog",
  description: "A blog app built with Next.js, TailwindCSS and Sanity.io",
};

const baseStyles: string =
  "bg-white text-black selection:bg-neutral-200 dark:bg-neutral-900 dark:text-white dark:selection:bg-neutral-700 min-h-fit overflow-auto";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const className = clsx(baseStyles, inter.className);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={className}>
        <ThemeProviders>
          <SmoothScroll>
            <Header />
            <TransitionLayout>
              <div className="w-full max-w-5xl mx-auto px-[4%]">{children}</div>
            </TransitionLayout>
          </SmoothScroll>
        </ThemeProviders>
      </body>
    </html>
  );
}

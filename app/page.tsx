export const metadata = {
  title: 'Thinking at 12am',
  description: 'A random blog where I share my thoughts, my feelings, and stories',
}

import Link from "next/link";
import Image from "next/image";
import BlogGrid from "@/components/BlogGrid";

export default async function Home() {
  return (
    <>
    <main className="flex flex-col p-10 items-center">
      <div>
        <h1 className="font-bold text-3xl">Thinking at 12AM</h1>
        <p className="p-7 text-lg ">A Random Thought Blog</p>
      </div>

      <div className="w-full max-w-2xl text-center p-5 border-b shadow-md mb-15">
        <Image
          src="/waterfall.jpeg"
          alt="Pic of me with waterfall"
          width={500}
          height={500}
          className="mx-auto w-full h-auto"
        />
        <div className="w-full p-5">
          <h1 className="font-bold text-2xl p-5">Hi, I&apos;m Melissa</h1>
          <p className="text-lg">
            Dog mom, regular mom, and now blogger. I started this blog as a
            place to share my thoughts, I hope you enjoy!{" "}
          </p>
          <Link href="/about">
            <p className="hover:underline pt-6 text-lg">Learn More {">"}</p>
          </Link>
        </div>
      </div>

      <div className="text-center m-8 w-full max-w-2xl bg-darker text-white border shadow-md">
        <Image
          src="/kidney.jpeg"
          alt="post kidney surgery"
          width={500}
          height={500}
          className="mx-auto w-full h-auto"
        />
        <div className="pt-5 pb-10">
          <h2 className="text-left px-7 font-semibold text-xl underline">Featured Post</h2>

          <h2 className="font-extrabold text-xl p-5">The One Kidney Club</h2>
          <p className="text-lg font-semibold px-5">
            In April 2024 I donated a kidney! Learn more about my story here!
          </p>
          <Link href="/posts/my-kidney-donation-journey">
            <div className="p-5 text-lg font-semibold hover:underline">Learn More {">"}</div>
          </Link>
        </div>
      </div>

      <div className="text-center m-8 w-full max-w-2xl">
        <h2 className="font-bold text-xl p-5">Recent Posts</h2>
        <BlogGrid />
      </div>
    </main>
    </>
  );
}

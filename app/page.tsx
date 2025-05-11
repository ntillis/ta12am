import Link from "next/link";
import Image from "next/image";
import BlogGrid from "@/components/BlogGrid";

export default async function Home() {
  return (
    <main className="flex flex-col p-10 items-center">
      <div>
        <h1 className="font-bold text-3xl">Thinking at 12AM</h1>
        <p className="p-7 text-lg ">A Random Thought Blog</p>
      </div>

      <div className="text-center w-3/5">
        <Image
          src="/waterfall.jpeg"
          alt="Pic of me with waterfall"
          width={500}
          height={500}
          className="mx-auto"
        />
        <h1 className="font-bold text-2xl p-5">Hi, I&apos;m Melissa</h1>
        <p className="text-lg">Dog mom, regular mom, and now blogger. I started this blog as a place to share my thoughts, I hope you enjoy!<br />Learn More</p>
      </div>

      <div className="text-center m-8 w-3/5">
          <Image
            src="/kidney.jpeg"
            alt="post kidney surgery"
            width={500}
            height={500}
            className="mx-auto"
          />
          <h2 className="font-bold text-xl p-5">The One Kidney Club</h2>
          <p className="text-lg">In March 2024 I donated a kidney! Learn more about my story here!</p>
          <Link href="/posts">Learn More {">"}</Link>
      </div>

      <div className="text-center m-8 w-3/5">
          <h2 className="font-bold text-xl p-5">Recent Posts</h2>
          <BlogGrid />
      </div>
    </main>
  );
}

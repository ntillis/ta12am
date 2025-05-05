import Link from "next/link";

export default async function Home() {
  return (
      <main className="flex flex-col p-24">
        <h1 className="text-3xl font-bold">Welcome to the app!</h1>
        <Link href="/users" className="text-blue-500 hover:underline">Users</Link>
        <Link href="/posts" className="text-blue-500 hover:underline">Posts</Link>
      </main>
  );
}

import Link from "next/link";

interface Post {
  createdAt: any;
  slug: string;
  title: string;
  content: string;
}

export default function BlogCard({ post }: { post: Post }) {
  return (
    <Link href={`/posts/${post.slug}`}>
      <div className="w-full flex flex-col text-left border-b-2 p-2 pt-10 m-2 hover:bg-gray-200">
        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
        <div className="flex justify-between">
          <p className="text-gray-600">
            {post.createdAt.toLocaleDateString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          <p className="text-gray-600 hover:underline">Read More {">"}</p>
        </div>
      </div>
    </Link>
  );
}

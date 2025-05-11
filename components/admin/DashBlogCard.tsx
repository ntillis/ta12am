import Delete from "./posts/Delete";
import Edit from "./posts/Edit"

interface Post {
  createdAt: any;
  slug: string;
  title: string;
  content: string;
}

export default function DashBlogCard({ post }: { post: Post }) {
  return (
      <div className="w-full flex flex-col text-left border-b-2 p-2 pt-8 pb-4 m-2">
        <a href={`/posts/${post.slug}`} className="text-xl font-bold mb-2 hover:text-gray-600 hover:underline">{post.title}</a>
        <div className="flex justify-between">
          <p className="text-gray-600">
            {post.createdAt.toLocaleDateString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          <div className="flex gap-3">
            <Edit />
            <Delete post={post} />
          </div>
        </div>
      </div>
  );
}

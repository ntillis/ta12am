/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogCard from './BlogCard';

export default function BlogGrid({ posts }: { posts: any[] }) {
    return (
      <div>
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    )
}
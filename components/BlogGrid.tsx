import { getPosts } from '@/lib/posts';
import BlogCard from './BlogCard';


export default async function BlogGrid() {
  const posts = await getPosts();
    return (
      <div className='flex flex-col'>
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    )
}
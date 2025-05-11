import { getPosts } from '@/lib/posts';
import DashBlogCard from './DashBlogCard';


export default async function DashBlogGrid() {
  const posts = await getPosts();
    return (
      <div className='flex flex-col my-4'>
        {posts.map((post) => (
          <DashBlogCard key={post.id} post={post} />
        ))}
      </div>
    )
}
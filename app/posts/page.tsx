import { getPosts } from '@/lib/posts';
import BlogGrid from '@/components/BlogGrid';
import React from 'react'

async function page() {
    const posts = await getPosts();
  return (
    <div className="flex flex-col items-center justify-center m-4">
      <h1>New Posts</h1>
      <BlogGrid posts={posts} />
  </div>
  )
}

export default page
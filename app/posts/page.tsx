import { getPosts } from '@/lib/posts';
import Link from 'next/link';
import React from 'react'

async function page() {
    const posts = await getPosts();
  return (
    <div className="flex flex-col items-center justify-center m-4">
    <ol>
      {posts.map((post) => (
        <li key={post.id} className="m-4">
          <Link href={`/posts/${post.slug}`}>{post.content}</Link></li>
      ))}
    </ol>
  </div>
  )
}

export default page
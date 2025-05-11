"use client";

import { Post } from "@/generated/prisma";
import Script from 'next/script'

interface PostViewerProps {
  post: Post;
}

export default function PostViewer({ post }: PostViewerProps) {
  const url = `/posts/${post.slug}`;
  return (
    <>
    <Script 
      src='https://platform-api.sharethis.com/js/sharethis.js#property=65b2921ab492fb00132dd19e&product=inline-share-buttons' 
      async={true} 
      strategy="afterInteractive"
    />
    <div className="relative flex flex-col m-6 p-10 w-full max-w-4xl mx-auto z-10">
      <header className="w-full flex flex-col items-center border-b">
        <h1 className="text-3xl font-bold mb-4 text-center">{post.title}</h1>
        <div className="pt-3 pb-6 text-gray-600 flex w-full items-center justify-end">
          <h2 className="">by {post.author} on {post.createdAt.toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                })}</h2>
        </div>
      </header>
      <div className="sharethis-inline-share-buttons mt-5 pt-2 relative z-10"></div>
      <div className="my-10 mx-auto max-w-2xl" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
    </>
  );
}

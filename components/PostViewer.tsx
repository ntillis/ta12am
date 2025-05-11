"use client";

import { Post } from "@/generated/prisma";

interface PostViewerProps {
  post: Post;
}

export default function PostViewer({ post }: PostViewerProps) {
  return (
    <div className="flex flex-col m-6 p-10 w-full max-w-6xl mx-auto">
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
      <div className="my-10" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}

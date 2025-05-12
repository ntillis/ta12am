"use client";

import { Post } from "@/generated/prisma";
import Script from "next/script";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface PostViewerProps {
  post: Post;
}

export default function PostViewer({ post }: PostViewerProps) {
  const time = post.createdAt.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })
  return (
    <>
      <Script
        src="https://platform-api.sharethis.com/js/sharethis.js#property=65b2921ab492fb00132dd19e&product=inline-share-buttons"
        async={true}
        strategy="afterInteractive"
      />
      <div className="relative flex flex-col m-6 p-10 w-full max-w-4xl mx-auto z-10">
        <header className="w-full flex flex-col border-b">
          <h1 className="text-3xl font-bold mb-4 w-full px-5 text-left">
            {post.title}
          </h1>
          <div className="flex justify-between items-center">
            <div className="pt-3 pb-6 px-5 text-gray-600 flex flex-col w-full">
              <h2 className="text-lg font-semibold">{post.author}</h2>
              <h2 className="text-sm">
                {post.createdAt.toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })} AT {time}
              </h2>
            </div>
            <div className="px-5">
                <Avatar className="w-12 h-12">
                  <AvatarImage src="/pfp.png"/>
                  <AvatarFallback>MT</AvatarFallback>
                </Avatar>
            </div>
          </div>
        </header>
        <div className="sharethis-inline-share-buttons mt-5 pt-2 relative z-10"></div>
        <div
          className="my-10 mx-auto max-w-2xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </>
  );
}

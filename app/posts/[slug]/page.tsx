export const metadata = {
    title: 'Thinking at 12am',
    description: 'Reading my post',
  }

import PostViewer from "@/components/PostViewer";
import prisma from "@/lib/prisma";
import React from "react";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export const revalidate = 300;

export default async function page(props: Props) {
  const params = await props.params;

  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
  });

  if (!post) {
    return <div>Post Not Found</div>;
  }

  return (
    <div className="relative flex flex-col m-6 p-10 w-full max-w-4xl mx-auto z-10">
      <PostViewer post={post} />      
    </div>
  );
}

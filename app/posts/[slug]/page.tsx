import prisma from '@/lib/prisma'
import React from 'react'

type Props = {
    params: {
        slug: string
    }
}

export default async function page({ params }: Props) {
    const param = await params
    const post = await prisma.post.findUnique({
        where: { slug: param.slug}
    })

    if (!post) {
        return <div>Post Not Found</div>
    }
    
  return (
    <div className="flex flex-col items-center justify-center m-4">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="text-sm text-gray-500">{post.content}</p>
    </div>
  )
}

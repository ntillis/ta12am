import PostViewer from '@/components/PostViewer'
import prisma from '@/lib/prisma'
import React from 'react'

type Props = {
    params: {
        slug: string
    }
}

export const revalidate = 300;

export default async function page({ params }: Props) {
    const param = await params
    const post = await prisma.post.findUnique({
        where: { slug: param.slug}
    })

    if (!post) {
        return <div>Post Not Found</div>
    }
    
  return (
    <PostViewer post={post} />
  )
}

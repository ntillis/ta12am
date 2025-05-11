import PostViewer from '@/components/PostViewer'
import prisma from '@/lib/prisma'
import React from 'react'

type Props = {
    params: Promise<{
        slug: string
    }>
}

export const revalidate = 300;

export default async function page(props: Props) {
    const params = await props.params;

    const { slug } = await params;

    const post = await prisma.post.findUnique({
        where: { slug: params.slug}
    })

    if (!post) {
        return <div>Post Not Found</div>
    }

    return (
      <PostViewer post={post} />
    )
}

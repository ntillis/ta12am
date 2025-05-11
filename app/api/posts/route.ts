import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { slugify } from '@/lib/slugify'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { title, content, tags } = body
        const slug = slugify(title)


        if (!title || !content) {
            return NextResponse.json({error: 'Title and content are required'}, {status: 400})
        }

        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                author: "Melissa Tillis",
                slug,
                tags: {
                    set: tags || [],
                }            
            }
        })
        return NextResponse.json(newPost, {status: 201})
    } catch (error) {
        console.error(error)
        return NextResponse.json({error: 'Error creating post'}, {status: 500})
    }
}
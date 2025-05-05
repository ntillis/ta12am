'use client'

import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Loading from "./ui/loading";
import { toast } from "sonner";

export default function CreatePostForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    title, 
                    content, 
                    tags: tags.split(',').map((tag: string) => tag.trim()),
                }),
            })

            if (res.ok) {
                const data = await res.json();
                router.push(`/posts/${data.slug}`);
                setTimeout(() => {
                    toast('Post created successfully');
                }, 1000);
            } else {
                throw new Error('Something went wrong');
            }
        } catch (error) {
            console.error('Error creating post:', error);
            setLoading(false);
        } 
    }

    if (loading) {
        return <Loading />
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full max-w-md p-4 mx-auto bg-white rounded-lg shadow-md">
            <div>
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="Post title"
                />
            </div>

            <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    placeholder="Post content"
                    rows={6}
                />
            </div>

            <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Post tags"
                />
            </div>

            <Button type="submit" disabled={loading} className="mt-4">
                Create Post
            </Button>
        </form>
    );
}
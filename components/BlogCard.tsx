import Link from "next/link";


interface Post {
    createdAt: string;
    slug: string;
    title: string;
    content: string;
}

export default function BlogCard({ post }: { post: Post }) {
    const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
    return (
        <Link href={`/posts/${post.slug}`}>
            <div>
                <h2>{post.title}</h2>
                <p>{post.content.slice(0,100)}...</p>
                <p>{formattedDate}</p>
            </div>
        </Link>
    )
}
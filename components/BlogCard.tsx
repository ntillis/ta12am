import Link from "next/link";


interface Post {
    slug: string;
    title: string;
    content: string;
}

export default function BlogCard({ post }: { post: Post }) {
    return (
        <Link href={`/posts/${post.slug}`}>
            <div>
                <h2>{post.title}</h2>
                <p>{post.content.slice(0,100)}...</p>
            </div>
        </Link>
    )
}
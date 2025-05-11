"use client"
import { Trash2 } from 'lucide-react'
import { useRouter } from "next/navigation"
import { toast } from "sonner"

function Delete({ post }: { post: { slug: string }}) {
    const router = useRouter();
  return (
    <button onClick={async () => {
        const confirmed = confirm("Delete post?")
        if (confirmed) {
            const res = await fetch(`/api/posts/${post.slug}`, {
                method: "DELETE",
            })

            if (res.ok) {
                router.refresh();
                toast("Post Successfully Deleted!")
                console.log("All clear")
            } else {
                alert("Deletion failed")
            }
        }
    }} className='hover:bg-gray-300 rounded'>
        <Trash2 />
    </button>
  )
}

export default Delete
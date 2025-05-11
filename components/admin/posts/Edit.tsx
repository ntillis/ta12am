"use client"
import { Pencil } from 'lucide-react'
import { useRouter } from "next/navigation"
import { toast } from "sonner"

function Edit() {
    const router = useRouter();
  return (
    <button onClick={async () => {
        const confirmed = confirm("Edit post?")
    }} className='hover:bg-gray-300 rounded'>
        <Pencil />
    </button>
  )
}

export default Edit
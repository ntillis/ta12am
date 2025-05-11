"use client"
import { Pencil } from 'lucide-react'

function Edit() {
  return (
    <button onClick={async () => {
        console.log("I want to edit this post!")
    }} className='hover:bg-gray-300 rounded'>
        <Pencil />
    </button>
  )
}

export default Edit
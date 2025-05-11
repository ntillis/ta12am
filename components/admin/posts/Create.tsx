import { SquarePen } from 'lucide-react';
import Link from 'next/link';

function Create() {
  return (
    <Link href='/admin/create-post'>
        <div className='p-3 flex gap-2 items-center w-max rounded-full border shadow hover:bg-gray-200'>
            <SquarePen />
            <h3 className='text-lg font-bold'>New Post</h3>
        </div>
    </Link>
  )
}

export default Create
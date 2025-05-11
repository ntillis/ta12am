import Link from 'next/link'
import Image from 'next/image'

const NotFound = () => {
  return (
    <div className='text-center items-center my-10'>
      <h1 className='text-2xl font-bold p-5'>Page Not Found. Yet</h1>
      <p>This page is still under construction.</p>
      <Image 
        src='/construction.jpeg' 
        alt='construction' 
        height={500} 
        width={500} 
        className='mx-auto p-8'
      />
      <Link href='/'>
        <h2 className='text-lg hover:underline'>Go Home {'>'}</h2>
      </Link>
    </div>
  );
};

export default NotFound;

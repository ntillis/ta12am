import prisma from '@/lib/prisma';
import React from 'react'

async function page() {
    const users = await prisma.user.findMany();
  return (
    <div className="flex flex-col items-center justify-center m-4">
    <ol>
      {users.map((user) => (
        <li key={user.id} className="m-4">{user.email}</li>
      ))}
    </ol>
  </div>
  )
}

export default page
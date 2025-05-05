import { Navbar } from "@/components/Navbar";
import prisma from "@/lib/prisma";

export default async function Home() {
  const users = await prisma.user.findMany();
  return (
      <main className="flex flex-col p-24">
        <Navbar />
        <div className="flex flex-col items-center justify-center m-4">
          <ol>
            {users.map((user) => (
              <li key={user.id} className="m-4">{user.email}</li>
            ))}
          </ol>
        </div>
      </main>
  );
}

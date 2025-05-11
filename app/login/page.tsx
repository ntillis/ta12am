'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch('/api/auth', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (res.ok) {
      router.push('/admin/dashboard');
      toast("Welcome back, Melissa");
    } else {
      alert('Invalid login');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 max-w-sm mx-auto mt-20">
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2" />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2" />
      <button type="submit" className="bg-black text-white p-2">Login</button>
    </form>
  );
}

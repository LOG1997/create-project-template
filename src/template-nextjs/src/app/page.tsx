'use client';

import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
export default function Home() {
  const router = useRouter();
  return (
    <main className="flex flex-col items-center min-h-screen gap-6 p-24">
      Hello
      <Link href="/home">Home</Link>
      <button type="button" onClick={() => router.push('/about')}>
      About
    </button>
    </main>
  )
}

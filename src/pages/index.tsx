import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import { Meta } from '@/layout/Meta';

const Index = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') return <h1>Loading session...</h1>;

  if (!session) {
    return (
      <div className="mt-10 grid place-items-center">
        <h1>No session</h1>
        <Link href="/api/auth/signin" passHref>
          <button className="bg-blue-400 py-1 px-3">Login</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center">
      <Meta title="NextJS Starter" description="" />
      <h1 className="mt-10 text-center text-4xl text-blue-700">
        NextJS Starter with Next Auth &amp; Prisma
      </h1>
      <p className="text-center">
        You are logged in as:
        <br />
        <strong>{session.user?.name}</strong> / {session.user?.email}
      </p>
      <Link href="/profile" passHref>
        <a className="mr-3 text-blue-600">Profile</a>
      </Link>
      <button className="mt-2 bg-gray-400 py-1  px-3" onClick={() => signOut()}>
        Logout
      </button>
    </div>
  );
};

export default Index;

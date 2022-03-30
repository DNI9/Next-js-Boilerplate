import { GetServerSideProps } from 'next';
import { DefaultSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import Link from 'next/link';

type Props = {
  user: DefaultSession['user'];
};

export default function Profile({ user }: Props) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <img
        src={user?.image!}
        alt={`profile picture of ${user?.name}`}
        className="w-20 rounded-md"
      />
      <h1 className="text-3xl">{user?.name}</h1>
      <p>{user?.email}</p>
      <Link href="/" passHref>
        <a className="text-blue-600">go back home</a>
      </Link>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { user: session.user },
  };
};

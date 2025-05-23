import Login from '@/components/auth/Login';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In | Inkly',
  description:
    'Access your Inkly account to create posts, comment, and connect with the blogging community.',
};

export default function Page() {
  return <Login />;
}

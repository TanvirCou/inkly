import Register from '@/components/auth/Register';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Sign Up | Inkly',
  description:
    'Join Inkly to share your voice, write blog posts, and connect with a creative community of writers and readers.',
};

export default function Page() {
  return <Register />;
}

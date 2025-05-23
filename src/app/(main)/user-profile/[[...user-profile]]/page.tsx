import Profile from '@/components/profile/Profile';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Profile | Inkly',
  description:
    'Customize your Inkly presence. Edit your profile and showcase your latest blog posts.',
};

const UserProfilePage = () => {
  return <Profile />;
};

export default UserProfilePage;

'use client';
import { UserProfile } from '@clerk/nextjs';
import { useTheme } from 'next-themes';
import { dark } from '@clerk/themes';

const UserProfilePage = () => {
  const { resolvedTheme } = useTheme();
  return (
    <div className="flex w-full justify-center py-6">
      <UserProfile
        appearance={{
          baseTheme: resolvedTheme === 'dark' ? dark : undefined,
        }}
      />
    </div>
  );
};

export default UserProfilePage;

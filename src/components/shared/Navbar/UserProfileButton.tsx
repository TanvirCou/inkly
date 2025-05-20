'use client';
import { SignedIn, UserButton } from '@clerk/nextjs';
import React from 'react';
import { useTheme } from 'next-themes';
import { dark } from '@clerk/themes';

const UserProfileButton = () => {
  const { resolvedTheme } = useTheme();
  return (
    <SignedIn>
      <UserButton
        appearance={{
          baseTheme: resolvedTheme === 'dark' ? dark : undefined,
        }}
      />
    </SignedIn>
  );
};

export default UserProfileButton;

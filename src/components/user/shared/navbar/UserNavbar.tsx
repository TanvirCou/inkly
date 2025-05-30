import Link from 'next/link';
import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ToggleButton } from '@/components/theming/ToggleButton';
import { SignedIn, UserButton } from '@clerk/nextjs';

const UserNavbar = () => {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background px-4 py-3">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <p className="font-semibold text-gray-500 dark:text-gray-400">|</p>

        <Link
          href="/user/dashboard"
          className="cursor-pointer bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text font-[Poppins] text-lg font-semibold text-transparent md:text-xl"
        >
          User-Dashboard
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <SignedIn>
          <UserButton />
        </SignedIn>

        <ToggleButton />
      </div>
    </div>
  );
};

export default UserNavbar;

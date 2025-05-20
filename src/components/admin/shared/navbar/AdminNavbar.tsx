import Link from 'next/link';
import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ToggleButton } from '@/components/theming/ToggleButton';
import { SignedIn, UserButton } from '@clerk/nextjs';

const AdminNavbar = () => {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background p-3">
      <SidebarTrigger />
      <div className="flex items-center gap-4">
        <Link
          href="/admin/dashboard"
          className="cursor-pointer font-[Poppins] text-lg font-semibold md:text-xl"
        >
          Admin-Dashboard
        </Link>
        <ToggleButton />

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default AdminNavbar;

import { LogOut, Settings, User } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { ToggleButton } from '@/components/theming/ToggleButton';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

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

import * as React from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import { ToggleButton } from '@/components/theming/ToggleButton';
import { SignedOut } from '@clerk/nextjs';
import UserProfileButton from './UserProfileButton';
import { auth } from '@clerk/nextjs/server';
import MobileNavigation from './MobileNavigation';

const MainNavbar = async () => {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role: string })?.role;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-indigo-100/50 bg-gradient-to-r from-white via-indigo-50/50 to-white backdrop-blur-sm dark:border-gray-800/50 dark:from-gray-900/80 dark:via-indigo-950/30 dark:to-gray-900/80">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8 lg:px-12">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text font-[Poppins] text-2xl font-bold text-transparent">
            Inkly
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="group relative text-sm font-medium text-gray-600 dark:text-gray-300"
          >
            <span className="relative">
              <span className="relative z-10 transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                Home
              </span>
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 group-hover:w-full dark:from-indigo-400 dark:to-purple-400"></span>
            </span>
          </Link>
          <Link
            href="/posts?sort=popular"
            className="group relative text-sm font-medium text-gray-600 dark:text-gray-300"
          >
            <span className="relative">
              <span className="relative z-10 transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                Most Popular
              </span>
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 group-hover:w-full dark:from-indigo-400 dark:to-purple-400"></span>
            </span>
          </Link>
          <Link
            href="/posts?sort=trending"
            className="group relative text-sm font-medium text-gray-600 dark:text-gray-300"
          >
            <span className="relative">
              <span className="relative z-10 transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                Trending
              </span>
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 group-hover:w-full dark:from-indigo-400 dark:to-purple-400"></span>
            </span>
          </Link>
          {role === 'admin' && (
            <Link
              href="/admin/dashboard"
              className="group relative text-sm font-medium text-gray-600 dark:text-gray-300"
            >
              <span className="relative">
                <span className="relative z-10 transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  Admin-Dashboard
                </span>
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 group-hover:w-full dark:from-indigo-400 dark:to-purple-400"></span>
              </span>
            </Link>
          )}
          {role === 'user' && (
            <Link
              href="/user/information"
              className="group relative text-sm font-medium text-gray-600 dark:text-gray-300"
            >
              <span className="relative">
                <span className="relative z-10 transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  User-Dashboard
                </span>
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 group-hover:w-full dark:from-indigo-400 dark:to-purple-400"></span>
              </span>
            </Link>
          )}
          <SignedOut>
            <Link
              href="/sign-in"
              className="rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-1.5 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:from-indigo-500 hover:to-purple-500 hover:shadow-md dark:from-indigo-500 dark:to-purple-500"
            >
              Login
            </Link>
          </SignedOut>

          <UserProfileButton />

          <ToggleButton />
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <UserProfileButton />
          <ToggleButton />
          {/* Mobile Navigation */}
          <MobileNavigation role={role} />
        </div>
      </div>
    </header>
  );
};

export default MainNavbar;

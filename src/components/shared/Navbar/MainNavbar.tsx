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

const MainNavbar = async () => {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role: string })?.role;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background px-4 md:px-8 lg:px-16">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="font-[Poppins] text-2xl font-bold text-indigo-600">
            Inkly
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-indigo-600"
          >
            Home
          </Link>
          <Link
            href="/posts?sort=popular"
            className="text-sm font-medium transition-colors hover:text-indigo-600"
          >
            Most Popular
          </Link>
          <Link
            href="/posts?sort=trending"
            className="text-sm font-medium transition-colors hover:text-indigo-600"
          >
            Trending
          </Link>
          {role === 'admin' && (
            <Link
              href="/admin/dashboard"
              className="text-sm font-medium transition-colors hover:text-indigo-600"
            >
              Admin-Dashboard
            </Link>
          )}
          {role === 'user' && (
            <Link
              href="/user/information"
              className="text-sm font-medium transition-colors hover:text-indigo-600"
            >
              User-Dashboard
            </Link>
          )}
          <SignedOut>
            <Link
              href="/sign-in"
              className="rounded-md bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 dark:text-white"
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
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-7 w-7" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="text-left" hidden>
                Menu
              </SheetTitle>
              <div className="flex h-full w-full flex-col items-center justify-center gap-4">
                <Link
                  href="/"
                  className="text-sm font-medium transition-colors hover:text-indigo-600"
                >
                  Home
                </Link>
                <Link
                  href="/posts?sort=popular"
                  className="text-sm font-medium transition-colors hover:text-indigo-600"
                >
                  Most Popular
                </Link>
                <Link
                  href="/posts?sort=trending"
                  className="text-sm font-medium transition-colors hover:text-indigo-600"
                >
                  Trending
                </Link>
                {role === 'admin' && (
                  <Link
                    href="/admin/dashboard"
                    className="text-sm font-medium transition-colors hover:text-indigo-600"
                  >
                    Admin-Dashboard
                  </Link>
                )}
                <SignedOut>
                  <Link
                    href="/sign-in"
                    className="rounded-md bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 dark:text-white"
                  >
                    Login
                  </Link>
                </SignedOut>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default MainNavbar;

import React from 'react';
import { format } from 'date-fns';
import { CalendarDays, Mail, User } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getSingleUser } from '@/lib/api/fetch-users';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile Information | Inkly',
  description:
    'View your personal profile details and account information on Inkly.',
};

async function InformationPage() {
  const user = await getSingleUser();

  return (
    <div className="p-6">
      <div className="mb-8 space-y-1">
        <div className="relative inline-block">
          <h1 className="bg-gradient-to-r from-gray-900 via-indigo-800 to-indigo-600 bg-clip-text text-xl font-bold tracking-tight text-transparent dark:from-white dark:via-indigo-300 dark:to-indigo-500 sm:text-2xl">
            Profile Information
          </h1>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Manage your personal information and account details
        </p>
      </div>

      <div className="mx-auto max-w-4xl space-y-6">
        {/* Profile Card */}
        <Card className="overflow-hidden border-gray-200/50 transition-all duration-300 hover:border-indigo-500/20 dark:border-gray-800/50 dark:hover:border-indigo-500/20">
          <CardHeader className="border-b border-gray-100 bg-white/50 dark:border-gray-800/50 dark:bg-gray-950/50">
            <div className="space-y-1.5">
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                Profile Details
              </CardTitle>
              <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                Your personal information and profile details
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="mt-6">
            <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-6 md:space-y-0">
              <Avatar className="h-24 w-24 ring-2 ring-indigo-500/20 transition-all duration-300 hover:ring-indigo-500/30">
                <AvatarImage
                  src={user.img}
                  alt={user.firstName}
                  className="object-cover"
                />
                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-lg text-white">
                  {user.firstName?.substring(0, 1)}
                  {user.lastName?.substring(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {user.title || 'No title set'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Details Card */}
        <Card className="overflow-hidden border-gray-200/50 transition-all duration-300 hover:border-indigo-500/20 dark:border-gray-800/50 dark:hover:border-indigo-500/20">
          <CardHeader className="border-b border-gray-100 bg-white/50 dark:border-gray-800/50 dark:bg-gray-950/50">
            <div className="space-y-1.5">
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                Account Information
              </CardTitle>
              <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                Your account details and contact information
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="mt-6 space-y-6">
            {/* Username */}
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-indigo-100 p-2 transition-colors dark:bg-indigo-900/30">
                <User className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Username
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  @{user.username}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-indigo-100 p-2 transition-colors dark:bg-indigo-900/30">
                <Mail className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Join Date */}
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-indigo-100 p-2 transition-colors dark:bg-indigo-900/30">
                <CalendarDays className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Joined On
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {format(new Date(user.createdAt), 'MMMM d, yyyy')}
                </p>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2 rounded-lg border border-gray-200 bg-gray-50/50 p-4 transition-all duration-300 hover:border-indigo-500/20 dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-indigo-500/20">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Bio
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.bio || 'No bio available'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default InformationPage;

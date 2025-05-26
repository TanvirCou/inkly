import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Users,
  FileText,
  Activity,
  Clock,
  MessageSquareText,
  MailOpen,
} from 'lucide-react';
import { getAllUsers } from '@/lib/api/fetch-users';
import { getAllComments } from '@/lib/api/fetch-comments';
import { getAllPosts } from '@/lib/api/fetch-posts';
import { Post, Comment, ActivityType } from '@/lib/types/types';
import { getAllActivities } from '@/lib/api/fetch-activities';
import { formatDistanceToNow } from 'date-fns';
import { getInquiries } from '@/lib/api/fetch-inquiries';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Inkly',
  description:
    'Manage posts, users, and site settings from the Inkly admin dashboard.',
};

const page = async () => {
  const allUsers = await getAllUsers();
  const allComments = await getAllComments();
  const allPosts = await getAllPosts();
  const allActivities = await getAllActivities();
  const allInquiries = await getInquiries();

  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  const todaysPosts = allPosts.filter(
    (post: Post) => post.createdAt.split('T')[0] === formattedDate
  );
  const todaysComments = allComments.filter(
    (comment: Comment) => comment.createdAt.split('T')[0] === formattedDate
  );

  const totalViews = allPosts.reduce(
    (acc: number, post: Post) => acc + post.visit,
    0
  );

  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <h1 className="bg-gradient-to-r from-gray-900 via-indigo-800 to-indigo-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-white dark:via-indigo-300 dark:to-indigo-500">
          Dashboard Overview
        </h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group relative overflow-hidden transition-all hover:shadow-md dark:hover:shadow-indigo-900/10">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {allUsers.length}
            </div>
          </CardContent>
        </Card>
        <Card className="group relative overflow-hidden transition-all hover:shadow-md dark:hover:shadow-indigo-900/10">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {allPosts.length}
            </div>
          </CardContent>
        </Card>
        <Card className="group relative overflow-hidden transition-all hover:shadow-md dark:hover:shadow-indigo-900/10">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comments</CardTitle>
            <MessageSquareText className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {allComments.length}
            </div>
          </CardContent>
        </Card>
        <Card className="group relative overflow-hidden transition-all hover:shadow-md dark:hover:shadow-indigo-900/10">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inquiries</CardTitle>
            <MailOpen className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {allInquiries.length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Card className="group relative overflow-hidden lg:col-span-2">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
          <CardHeader className="relative">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="space-y-6">
              {!!allActivities &&
                allActivities.map((item: ActivityType) => (
                  <div
                    key={item._id}
                    className="group/item flex items-start space-x-4 rounded-lg p-3 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <div className="rounded-full bg-indigo-100 p-2 dark:bg-indigo-900/30">
                      <Clock className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {item.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDistanceToNow(new Date(item.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              {allActivities.length === 0 && (
                <div className="flex min-h-[200px] w-full items-center justify-center text-gray-500 dark:text-gray-400">
                  No activities found
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
          <CardHeader className="relative">
            <CardTitle className="text-lg">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="space-y-6">
              <div className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Active Users
                </span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {allUsers.length}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  New Posts Today
                </span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {todaysPosts.length}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Comments Today
                </span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {todaysComments.length}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Total Inquiries
                </span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {allInquiries.length}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Total Views
                </span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {totalViews}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;

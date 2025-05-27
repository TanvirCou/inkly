import React from 'react';
import { Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getSingleUserActivities } from '@/lib/api/fetch-activities';
import { ActivityType } from '@/lib/types/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Activity Log | Inkly',
  description:
    'Review your recent activity on Inkly including posts, comments, and interactions.',
};

async function ActivityPage() {
  const activities = await getSingleUserActivities();

  return (
    <div className="p-6">
      <div className="mb-8 space-y-1">
        <div className="relative inline-block">
          <h1 className="bg-gradient-to-r from-gray-900 via-indigo-800 to-indigo-600 bg-clip-text text-2xl font-bold tracking-tight text-transparent dark:from-white dark:via-indigo-300 dark:to-indigo-500">
            Activity Center
          </h1>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Track all your interactions and engagements
        </p>
      </div>

      <div className="mx-auto max-w-4xl">
        <Card className="overflow-hidden border-gray-200/50 transition-all duration-300 hover:border-indigo-500/20 dark:border-gray-800/50 dark:hover:border-indigo-500/20">
          <CardHeader className="border-b border-gray-100 bg-white/50 dark:border-gray-800/50 dark:bg-gray-950/50">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-indigo-100 p-2 dark:bg-indigo-900/30">
                  <Clock className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  Recent Activities
                </CardTitle>
              </div>
              <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                Your latest interactions across the platform
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="mt-6">
            <div className="space-y-4">
              {!!activities &&
                activities.map((item: ActivityType) => (
                  <div
                    key={item._id}
                    className="group flex items-start space-x-4 rounded-lg border border-gray-200/50 bg-white/50 p-4 transition-all duration-300 hover:border-indigo-500/20 hover:bg-gray-50/80 dark:border-gray-800/50 dark:bg-gray-950/50 dark:hover:border-indigo-500/20 dark:hover:bg-gray-900/80"
                  >
                    <div className="rounded-full bg-indigo-100 p-2 transition-colors dark:bg-indigo-900/30">
                      <Clock className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {item.message}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {formatDistanceToNow(new Date(item.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              {activities.length === 0 && (
                <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed border-gray-200 text-sm text-gray-600 dark:border-gray-800 dark:text-gray-400">
                  No activities found
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ActivityPage;

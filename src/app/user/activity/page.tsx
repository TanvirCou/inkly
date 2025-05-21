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

async function ActivityPage() {
  const activities = await getSingleUserActivities();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Activity Center</h1>
        <p className="text-muted-foreground">
          Track all your interactions and engagements
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Activities
          </CardTitle>
          <CardDescription>
            Your latest interactions across the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {!!activities &&
              activities.map((item: ActivityType) => (
                <div
                  key={item._id}
                  className="flex items-start space-x-4 rounded-lg border p-4 transition-all hover:bg-muted/50"
                >
                  <div className="rounded-full bg-primary/10 p-2">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {item.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(item.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              ))}
            {activities.length === 0 && (
              <div className="flex min-h-[200px] items-center justify-center text-muted-foreground">
                No activities found
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ActivityPage;

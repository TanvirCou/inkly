import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Users,
  FileText,
  Activity,
  Clock,
  MessageSquareText,
  ShieldHalf,
} from 'lucide-react';
import { getAllUsers, getUsers } from '@/lib/api/fetch-users';
import { getAllComments } from '@/lib/api/fetch-comments';
import { getAllPosts } from '@/lib/api/fetch-posts';
import { Post, Comment, ActivityType } from '@/lib/types/types';
import { getAllActivities } from '@/lib/api/fetch-activities';
import { formatDistanceToNow } from 'date-fns';
const page = async () => {
  const allUsers = await getAllUsers();
  const allComments = await getAllComments();
  const allPosts = await getAllPosts();
  const admin = await getUsers();
  const allActivities = await getAllActivities();

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
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allUsers.length}</div>
            {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allPosts.length}</div>
            {/* <p className="text-xs text-muted-foreground">+12.3% from last month</p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comments</CardTitle>
            <MessageSquareText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allComments.length}</div>
            {/* <p className="text-xs text-muted-foreground">+8.2% from last month</p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admin</CardTitle>
            <ShieldHalf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{admin.length}</div>
            {/* <p className="text-xs text-muted-foreground">+2.1% from last month</p> */}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!!allActivities &&
                allActivities.map((item: ActivityType) => (
                  <div
                    key={item._id}
                    className="flex items-start space-x-4 rounded-lg p-2 transition-colors hover:bg-muted/50"
                  >
                    <div className="rounded-full bg-primary/10 p-2">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(item.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              {allActivities.length === 0 && (
                <div className="flex min-h-[200px] w-full items-center justify-center text-muted-foreground">
                  No activities found
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Active Users
                </span>
                <span className="font-medium">{allUsers.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  New Posts Today
                </span>
                <span className="font-medium">{todaysPosts.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Comments Today
                </span>
                <span className="font-medium">{todaysComments.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Total Views
                </span>
                <span className="font-medium">{totalViews}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;

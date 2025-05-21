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

async function InformationPage() {
  const user = await getSingleUser();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Profile Information
        </h1>
        <p className="text-muted-foreground">
          Manage your personal information
        </p>
      </div>

      <div className="grid gap-6">
        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
            <CardDescription>
              Your personal information and profile details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-6 md:space-y-0">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.img} alt={user.firstName} />
                <AvatarFallback className="text-lg">
                  {user.firstName?.substring(0, 1)}
                  {user.lastName?.substring(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1 text-center md:text-left">
                <h2 className="text-2xl font-bold">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-muted-foreground">
                  {user.title || 'No title set'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Details Card */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              Your account details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Username */}
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-primary/10 p-2">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium leading-none">Username</p>
                <p className="text-sm text-muted-foreground">
                  @{user.username}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-primary/10 p-2">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium leading-none">Email</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            {/* Join Date */}
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-primary/10 p-2">
                <CalendarDays className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium leading-none">Joined On</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(user.createdAt), 'MMMM d, yyyy')}
                </p>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2 pt-2">
              <p className="text-sm font-medium leading-none">Bio</p>
              <p className="text-sm text-muted-foreground">
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

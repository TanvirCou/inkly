import { userPostsColumns } from '@/components/user/table/user-posts-column';
import { UserPostsTable } from '@/components/user/table/user-post-table';
import { getAuthorPosts } from '@/lib/api/fetch-posts';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { getSingleUser } from '@/lib/api/fetch-users';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Posts | Inkly',
  description: 'View and manage all the blog posts you’ve written on Inkly.',
};

const page = async () => {
  const user = await getSingleUser();
  const data = await getAuthorPosts(user.username);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xl font-semibold">All Posts</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage all blog posts from here.
          </p>
        </div>
        <Link href="/create-post">
          <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
            <PlusCircle className="mr-1" />
            Create Post
          </Button>
        </Link>
      </div>

      <div className="mt-2">
        <UserPostsTable columns={userPostsColumns} data={data} />
      </div>
    </div>
  );
};

export default page;

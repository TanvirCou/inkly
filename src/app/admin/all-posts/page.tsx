import { allPostsColumns } from '@/components/admin/table/all-posts-column';
import { PostsTable } from '@/components/admin/table/posts-table';
import { Button } from '@/components/ui/button';
import { getAllPosts } from '@/lib/api/fetch-posts';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const page = async () => {
  const data = await getAllPosts();

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
        <PostsTable columns={allPostsColumns} data={data} />
      </div>
    </div>
  );
};

export default page;

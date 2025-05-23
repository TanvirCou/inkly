import { PostsTable } from '@/components/admin/table/posts-table';
import { featuredPostsColumns } from '@/components/admin/table/featured-posts-column';
import { Button } from '@/components/ui/button';
import { getFeaturedPosts } from '@/lib/api/fetch-posts';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Featured Posts | Inkly Admin',
  description:
    'Manage and curate featured blog posts showcased on the Inkly homepage.',
};

const page = async () => {
  const data = await getFeaturedPosts();

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xl font-semibold">Featured Posts</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage all featured posts from here.
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
        <PostsTable columns={featuredPostsColumns} data={data} />
      </div>
    </div>
  );
};

export default page;

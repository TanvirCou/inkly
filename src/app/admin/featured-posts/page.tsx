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
        <div className="w-[50%] space-y-1 sm:w-auto">
          <h1 className="bg-gradient-to-r from-gray-900 via-indigo-800 to-indigo-600 bg-clip-text text-xl font-bold tracking-tight text-transparent dark:from-white dark:via-indigo-300 dark:to-indigo-500 sm:text-2xl">
            Featured Posts
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage all featured posts from here.
          </p>
        </div>
        <Link href="/create-post">
          <Button className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-indigo-700 text-white transition-all duration-300 hover:from-indigo-700 hover:to-indigo-800 hover:shadow-lg hover:shadow-indigo-500/25">
            <div className="relative flex items-center">
              <PlusCircle className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
              <span>Create Post</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity group-hover:opacity-100"></div>
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

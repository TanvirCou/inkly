import { getSavedPosts } from '@/lib/api/fetch-posts';
import React from 'react';
import { SavedPostsTable } from '@/components/user/table/saved-post-table';
import { savedPostsColumns } from '@/components/user/table/saved-posts-column';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bookmarks | Inkly',
  description: 'Your list of saved blog posts on Inkly.',
};

const page = async () => {
  const data = await getSavedPosts();

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="bg-gradient-to-r from-gray-900 via-indigo-800 to-indigo-600 bg-clip-text text-2xl font-bold tracking-tight text-transparent dark:from-white dark:via-indigo-300 dark:to-indigo-500">
            Saved Posts
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage all saved posts from here.
          </p>
        </div>
      </div>

      <div className="mt-2">
        <SavedPostsTable columns={savedPostsColumns} data={data} />
      </div>
    </div>
  );
};

export default page;

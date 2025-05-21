import { getSavedPosts } from '@/lib/api/fetch-posts';
import React from 'react';
import { SavedPostsTable } from '@/components/user/table/saved-post-table';
import { savedPostsColumns } from '@/components/user/table/saved-posts-column';

const page = async () => {
  const data = await getSavedPosts();

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xl font-semibold">Saved Posts</p>
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

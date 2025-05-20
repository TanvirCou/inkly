import CreateCategory from '@/components/admin/shared/button/CreateCategory';
import { categoryColumns } from '@/components/admin/table/category-column';
import { CategoryTable } from '@/components/admin/table/category-table';
import { getAllCategories } from '@/lib/api/fetch-categories';
import { Category } from '@/lib/types/types';
import React from 'react';

const page = async () => {
  const data: Category[] = await getAllCategories();

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xl font-semibold">All Categories</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage all category from here.
          </p>
        </div>
        <CreateCategory />
      </div>

      <div className="mt-2">
        <CategoryTable columns={categoryColumns} data={data || []} />
      </div>
    </div>
  );
};

export default page;

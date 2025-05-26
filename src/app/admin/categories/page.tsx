import CreateCategory from '@/components/admin/shared/button/CreateCategory';
import { categoryColumns } from '@/components/admin/table/category-column';
import { CategoryTable } from '@/components/admin/table/category-table';
import { getAllCategories } from '@/lib/api/fetch-categories';
import { Category } from '@/lib/types/types';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Categories | Inkly Admin',
  description: 'Manage all categories from the Inkly admin dashboard.',
};

const page = async () => {
  const data: Category[] = await getAllCategories();

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="bg-gradient-to-r from-gray-900 via-indigo-800 to-indigo-600 bg-clip-text text-2xl font-bold tracking-tight text-transparent dark:from-white dark:via-indigo-300 dark:to-indigo-500">
            All Categories
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage all categories from here.
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

import CreateAdmin from '@/components/admin/shared/button/CreateAdmin';
import { adminColumns } from '@/components/admin/table/admin-column';
import { AdminTable } from '@/components/admin/table/admin-table';
import { getUsers } from '@/lib/api/fetch-users';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin List | Inkly Admin',
  description: 'Manage all admins from the Inkly admin dashboard.',
};

const page = async () => {
  const data = await getUsers();

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="bg-gradient-to-r from-gray-900 via-indigo-800 to-indigo-600 bg-clip-text text-2xl font-bold tracking-tight text-transparent dark:from-white dark:via-indigo-300 dark:to-indigo-500">
            Admins
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage all admins from here.
          </p>
        </div>
        <CreateAdmin />
      </div>

      <div className="mt-2">
        <AdminTable columns={adminColumns} data={data} />
      </div>
    </div>
  );
};

export default page;

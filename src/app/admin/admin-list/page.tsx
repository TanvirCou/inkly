import CreateAdmin from '@/components/admin/shared/button/CreateAdmin';
import { adminColumns } from '@/components/admin/table/admin-column';
import { AdminTable } from '@/components/admin/table/admin-table';
import { getUsers } from '@/lib/api/fetch-users';
import React from 'react';

const page = async () => {
  const data = await getUsers();

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xl font-semibold">Admins</p>
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

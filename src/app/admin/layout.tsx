import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { cookies } from 'next/headers';
import AdminNavbar from '@/components/admin/shared/navbar/AdminNavbar';
import AppSidebar from '@/components/admin/shared/sidebar/AppSidebar';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
  return (
    <div>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <main className="w-full">
          <AdminNavbar />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
};

export default Layout;

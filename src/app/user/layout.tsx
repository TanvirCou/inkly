import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { cookies } from 'next/headers';
import UserSidebar from '@/components/user/shared/sidebar/UserSidebar';
import UserNavbar from '@/components/user/shared/navbar/UserNavbar';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
  return (
    <div>
      <SidebarProvider defaultOpen={defaultOpen}>
        <UserSidebar />
        <main className="w-full">
          <UserNavbar />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
};

export default Layout;

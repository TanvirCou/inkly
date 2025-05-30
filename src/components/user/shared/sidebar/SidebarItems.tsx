'use client';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Bookmark,
  ClipboardList,
  Contact,
  Home,
  SquareActivity,
  UserPen,
} from 'lucide-react';

const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Information',
    url: '/user/information',
    icon: Contact,
  },
  {
    title: 'Customize Info',
    url: '/user/customize-bio',
    icon: UserPen,
  },
  {
    title: 'All Posts',
    url: '/user/all-posts',
    icon: ClipboardList,
  },
  {
    title: 'Saved Posts',
    url: '/user/saved-posts',
    icon: Bookmark,
  },
  {
    title: 'Activity',
    url: '/user/activity',
    icon: SquareActivity,
  },
];

const SidebarItems = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <Link
              href={item.url}
              className={cn(isActive(item.url) && 'bg-indigo-500 text-white')}
            >
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

export default SidebarItems;

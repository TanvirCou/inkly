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
  AlignLeft,
  CalendarClock,
  ClipboardList,
  Home,
  LayoutDashboard,
  Mailbox,
  Settings,
  Star,
  Users,
} from 'lucide-react';

const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Dashboard',
    url: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'All Posts',
    url: '/admin/all-posts',
    icon: ClipboardList,
  },
  {
    title: 'Featured Posts',
    url: '/admin/featured-posts',
    icon: Star,
  },
  {
    title: "Today's Posts",
    url: '/admin/today-posts',
    icon: CalendarClock,
  },
  {
    title: 'All Categories',
    url: '/admin/categories',
    icon: AlignLeft,
  },
  {
    title: 'Admin List',
    url: '/admin/admin-list',
    icon: Users,
  },
  {
    title: 'Inquiries',
    url: '/admin/contact-inquiries',
    icon: Mailbox,
  },
  {
    title: 'Settings',
    url: '/admin/settings',
    icon: Settings,
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

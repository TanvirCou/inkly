import {
  AlignLeft,
  CalendarClock,
  ChevronUp,
  ClipboardList,
  Home,
  LayoutDashboard,
  Mailbox,
  Settings,
  ShieldHalf,
  Star,
  Users,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getSingleUser } from '@/lib/api/fetch-users';
import { Admin } from '@/lib/types/types';
import { SignOutButton } from '@clerk/nextjs';

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

async function AppSidebar() {
  const user: Admin = await getSingleUser();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/"
                className="font-[Poppins] text-xl font-semibold text-indigo-600"
              >
                <ShieldHalf size={20} />
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text font-[Poppins] text-xl font-bold text-transparent">
                  Inkly
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="cursor-pointer">
                <SidebarMenuButton>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={user.img} />
                      <AvatarFallback className="uppercase">
                        {user.firstName.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs">
                      {user.firstName} {user.lastName}
                    </span>
                  </div>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="/user-profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="/admin/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="w-full cursor-pointer text-red-600"
                >
                  <SignOutButton redirectUrl="/" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;

import {
  Bookmark,
  ChevronUp,
  ClipboardList,
  Home,
  ShieldHalf,
  SquareActivity,
  UserPen,
  UserRoundCog,
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
    title: 'Information',
    url: '/user/information',
    icon: UserRoundCog,
  },
  {
    title: 'Customize Bio',
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

async function UserSidebar() {
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
                Inkly
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
                  <Link href="/user/activity">Activity</Link>
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

export default UserSidebar;

'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Bookmark, MoreHorizontal, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Post } from '@/lib/types/types';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export const savedPostsColumns: ColumnDef<Post>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    id: 'postInfo',
    accessorFn: (row) => row.title,
    header: 'Post Info',
    cell: ({ row }) => {
      const post = row.original;
      return (
        <div className="flex items-center gap-2">
          <Image
            src={post.img}
            alt={post.title}
            width={50}
            height={50}
            className="rounded-sm"
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p>
                  {post.title.length > 30
                    ? `${post.title.slice(0, 30)}...`
                    : post.title}
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <p>{post.title}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
  {
    accessorKey: 'author',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Author
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const post = row.original;
      return (
        <p>
          {post.user.firstName} {post.user.lastName}
        </p>
      );
    },
  },
  {
    accessorKey: 'featured',
    header: 'Featured',
    cell: ({ row }) => {
      const post = row.original;
      return (
        <p>
          {post.isFeatured ? <Star color="orange" fill="orange" /> : <Star />}
        </p>
      );
    },
  },
  {
    accessorKey: 'visit',
    header: 'Visit',
    cell: ({ row }) => {
      const post = row.original;
      return <p>{post.visit}</p>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      const post = row.original;
      return <p>{format(new Date(post.createdAt), 'MMM d, yyyy')}</p>;
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const post = row.original;
      const router = useRouter();
      const { getToken } = useAuth();
      const { toast } = useToast();

      const handleUnsavePost = async () => {
        const token = await getToken();
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/save`,
          {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ postId: post._id }),
          }
        );

        const newDate = new Date().toISOString();

        if (res.ok) {
          const formattedDate = format(
            parseISO(newDate),
            "MMMM d, yyyy 'at' h:mm a"
          );
          toast({
            title: 'Post has been unsaved successfully',
            description: formattedDate,
          });
          router.refresh();
        } else {
          toast({
            title: 'Error',
            description: 'Failed to unsave post',
            variant: 'destructive',
          });
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <p className="flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-red-600 hover:bg-red-600 hover:text-white">
                    <Bookmark size={16} className="mr-2" />
                    Unsave
                  </p>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will unsave this post.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleUnsavePost}
                      className="bg-red-600 text-white hover:bg-red-700"
                    >
                      Unsave
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

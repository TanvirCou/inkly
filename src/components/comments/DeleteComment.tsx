'use client';
import React from 'react';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
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

const DeleteComment = ({ commentId }: { commentId: string }) => {
  const { getToken } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    const token = await getToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/comments/${commentId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(res);
    if (res.ok) {
      toast({
        title: 'Comment deleted',
        description: 'Comment deleted successfully',
      });
      router.refresh();
    } else {
      toast({
        title: 'Error',
        description: 'Failed to delete comment',
        variant: 'destructive',
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full p-2 text-gray-400 transition-all hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-950/30"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-xl border border-indigo-100/50 bg-gradient-to-br from-white via-indigo-50/50 to-purple-50/50 p-6 shadow-xl dark:border-indigo-800/50 dark:from-gray-900/80 dark:via-indigo-950/50 dark:to-purple-950/50">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
            Delete Comment
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 dark:text-gray-300">
            This action cannot be undone. This will permanently delete your
            comment.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-6">
          <AlertDialogCancel className="rounded-lg border-0 bg-gray-100 font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="rounded-lg bg-red-500 font-medium text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteComment;

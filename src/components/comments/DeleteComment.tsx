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
          className="text-gray-500 hover:text-red-500"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            comment.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteComment;

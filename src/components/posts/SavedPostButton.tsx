'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Bookmark } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { format, parseISO } from 'date-fns';

const SavedPostButton = ({
  postId,
  savedPosts,
}: {
  postId: string;
  savedPosts: string[];
}) => {
  const router = useRouter();
  const { getToken } = useAuth();
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (savedPosts.includes(postId)) {
      setIsSaved(true);
    }
  }, [savedPosts, postId]);

  const handleSavePost = async () => {
    const token = await getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/save`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ postId }),
    });

    const message = await res.json();

    const newDate = new Date().toISOString();

    if (res.ok) {
      const formattedDate = format(
        parseISO(newDate),
        "MMMM d, yyyy 'at' h:mm a"
      );
      toast({
        title: message,
        description: formattedDate,
      });
      setIsSaved((prev) => !prev);
      router.refresh();
    } else {
      toast({
        title: 'Error',
        description: 'Failed to save post',
        variant: 'destructive',
      });
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900"
            aria-label="Save post"
            onClick={handleSavePost}
          >
            <Bookmark
              fill={isSaved ? 'currentColor' : 'none'}
              className="h-5 w-5 text-indigo-600 transition-transform duration-300 hover:scale-110 dark:text-indigo-400"
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{isSaved ? 'Unsave this post' : 'Save this post'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SavedPostButton;

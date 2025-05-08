import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';
import { getComments } from '@/lib/api/fetch-comments';
import { Comment } from '@/lib/types/types';
import { formatDistanceToNow } from 'date-fns';
import DeleteComment from './DeleteComment';

const AllComments = async ({ postId }: { postId: string }) => {
  const comments: Comment[] = await getComments(postId);

  return (
    <div className="space-y-6">
      {comments.map((comment: Comment) => (
        <div
          key={comment._id}
          className="rounded-lg border border-gray-100 bg-indigo-50 p-4 dark:border-gray-800 dark:bg-primary-foreground"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={comment.user?.img} alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium">{comment.user?.username}</h4>
                <p className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(comment.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
            <DeleteComment commentId={comment._id} />
          </div>
          <p className="text-gray-600 dark:text-gray-300">{comment.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default AllComments;

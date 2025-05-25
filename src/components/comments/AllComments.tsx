import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getComments } from '@/lib/api/fetch-comments';
import { Comment } from '@/lib/types/types';
import { formatDistanceToNow } from 'date-fns';
import DeleteComment from './DeleteComment';

const AllComments = async ({ postId }: { postId: string }) => {
  const comments: Comment[] = await getComments(postId);

  return (
    <div className="space-y-8">
      {comments.map((comment: Comment) => (
        <div
          key={comment._id}
          className="group relative overflow-hidden rounded-xl border border-indigo-100/50 bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 p-6 shadow-md backdrop-blur-sm transition-all dark:border-indigo-800/50 dark:from-gray-900/80 dark:via-indigo-950/30 dark:to-purple-950/30"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 p-[2px] shadow-lg">
                <Avatar className="h-full w-full">
                  <AvatarImage src={comment.user?.img} alt="User" />
                  <AvatarFallback className="bg-gradient-to-br from-indigo-100 to-purple-100 uppercase dark:from-indigo-900 dark:to-purple-900">
                    {comment.user?.username?.substring(0, 2) || 'U'}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div>
                <h4 className="bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-base font-bold text-transparent dark:from-white dark:to-gray-200">
                  {comment.user?.username}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDistanceToNow(new Date(comment.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
            <DeleteComment commentId={comment._id} />
          </div>
          <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300">
            {comment.desc}
          </p>
        </div>
      ))}

      {comments.length === 0 && (
        <div className="flex h-32 w-full items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30">
          <p className="text-base font-medium text-gray-600 dark:text-gray-300">
            No comments yet. Be the first to comment!
          </p>
        </div>
      )}
    </div>
  );
};

export default AllComments;

import React from 'react';
import Image from 'next/image';
import { Calendar } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Post } from '@/lib/types/types';
import { format } from 'date-fns';
import Link from 'next/link';

interface PostItemProps {
  post: Post;
}

const PostItem = ({ post }: PostItemProps) => {
  return (
    <Card className="group mb-6 w-full overflow-hidden border border-indigo-100/50 bg-gradient-to-br from-white via-indigo-50/50 to-purple-50/50 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:border-gray-800/50 dark:from-gray-900/80 dark:via-indigo-950/50 dark:to-purple-950/50">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
      <div className="flex flex-col md:flex-row">
        {/* Image section */}
        <div className="relative h-60 overflow-hidden md:h-auto md:w-1/3">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          <Image
            src={post?.img}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content section */}
        <div className="relative flex flex-col p-5 md:w-2/3 md:p-6">
          {/* Category and date */}
          <div className="mb-3 flex items-center justify-between">
            <Badge className="cursor-pointer rounded-full bg-gradient-to-r from-indigo-600/90 to-indigo-500 px-3 py-1 text-xs font-medium text-white shadow-sm transition-all hover:from-indigo-500 hover:to-purple-500 dark:from-indigo-400 dark:to-purple-400">
              <Link
                href={`/posts?cat=${post.category}`}
                className="cursor-pointer first-letter:uppercase"
              >
                {post.category}
              </Link>
            </Badge>

            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300">
              <div className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-1">
                <Calendar size={12} className="text-white" />
              </div>
              <span>{format(new Date(post.createdAt), 'MMMM d, yyyy')}</span>
            </div>
          </div>

          {/* Title and description */}
          <Link href={`/posts/${post.slug}`}>
            <h3 className="mb-2 bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-lg font-bold text-transparent transition-all hover:from-indigo-600 hover:to-purple-600 dark:from-white dark:to-gray-200 dark:hover:from-indigo-400 dark:hover:to-purple-400">
              {post.title}
            </h3>
          </Link>
          <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
            {post.desc}
          </p>

          {/* Author and read time */}
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 p-[2px] shadow-lg">
                <Avatar className="h-full w-full">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className="bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900">
                    CN
                  </AvatarFallback>
                </Avatar>
              </div>
              <span className="text-sm font-medium text-gray-800 dark:text-white">
                {post.user?.firstName} {post.user?.lastName}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PostItem;

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Post } from '@/lib/types/types';
import { format } from 'date-fns';

interface PostItemProps {
  post: Post;
}

const PostItem = ({ post }: PostItemProps) => {
  return (
    <article className="mb-6 w-full overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-800 dark:bg-primary-foreground">
      <div className="flex flex-col md:flex-row">
        {/* Image section */}
        <div className="relative h-60 md:h-auto md:w-1/3">
          <Image
            src={post?.img}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content section */}
        <div className="flex flex-col p-5 md:w-2/3 md:p-6">
          {/* Category and date */}
          <div className="mb-3 flex items-center justify-between">
            <Badge className="cursor-pointer rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700 first-letter:uppercase hover:bg-indigo-700 hover:text-indigo-100 dark:bg-indigo-700 dark:text-indigo-100 dark:hover:bg-indigo-100 dark:hover:text-indigo-700">
              <Link
                href={`/posts?cat=${post.category}`}
                className="first-letter:uppercase"
              >
                {post.category}
              </Link>
            </Badge>

            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-white">
              <Calendar size={14} className="text-indigo-500" />
              <span>{format(new Date(post.createdAt), 'MMMM d, yyyy')}</span>
            </div>
          </div>

          {/* Title and description */}
          <Link href={`/posts/${post.slug}`}>
            <h3 className="mb-2 text-lg font-bold text-gray-800 transition-colors hover:text-indigo-600 dark:text-white">
              {post.title}
            </h3>
          </Link>

          <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
            {post.desc}
          </p>

          {/* Author and read time */}
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gray-200">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <span className="text-sm font-medium text-gray-800 dark:text-white">
                {post.user.username}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostItem;

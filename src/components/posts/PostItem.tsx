import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface PostItemProps {
  post: {
    id: number;
    title: string;
    description: string;
    image: string;
    author: string;
    createdAt: string;
    category: string;
    readTime?: string;
  };
}

const PostItem = ({ post }: PostItemProps) => {
  return (
    <article className="mb-6 w-full overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-800 dark:bg-primary-foreground">
      <div className="flex flex-col md:flex-row">
        {/* Image section */}
        <div className="relative h-60 md:h-auto md:w-1/3">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content section */}
        <div className="flex flex-col p-5 md:w-2/3 md:p-6">
          {/* Category and date */}
          <div className="mb-3 flex items-center justify-between">
            <Badge className="cursor-pointer rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700 hover:bg-indigo-700 hover:text-indigo-100 dark:bg-indigo-700 dark:text-indigo-100">
              {post.category}
            </Badge>

            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-white">
              <Calendar size={14} className="text-indigo-500" />
              <span>{post.createdAt}</span>
            </div>
          </div>

          {/* Title and description */}
          <Link href={`/post/${post.id}`}>
            <h3 className="mb-2 text-lg font-bold text-gray-800 transition-colors hover:text-indigo-600 dark:text-white">
              {post.title}
            </h3>
          </Link>

          <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
            {post.description}
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
                {post.author}
              </span>
            </div>

            {post.readTime && (
              <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-500 dark:bg-gray-800 dark:text-white">
                {post.readTime} min read
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostItem;

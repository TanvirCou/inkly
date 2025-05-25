import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '../ui/badge';
import { Calendar } from 'lucide-react';
import { getRelatedPosts } from '@/lib/api/fetch-posts';
import { Post } from '@/lib/types/types';
import { format } from 'date-fns';

const RelatedPosts = async ({
  category,
  postId,
}: {
  category: string;
  postId: string;
}) => {
  const posts: Post[] = await getRelatedPosts(category);
  const filteredPosts = posts.filter((post: Post) => post._id !== postId);

  return (
    <div className="border-t border-indigo-100 pt-16 dark:border-indigo-800">
      <div className="mb-12 flex items-center gap-4">
        <h2 className="relative bg-gradient-to-r from-gray-900 via-indigo-800 to-indigo-600 bg-clip-text text-2xl font-bold text-transparent dark:from-white dark:via-indigo-300 dark:to-indigo-500">
          Related Posts
          <span className="absolute -bottom-2 left-0 h-1 w-24 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"></span>
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-indigo-100 via-purple-50 to-transparent dark:from-indigo-800/50 dark:via-purple-900/30 dark:to-transparent"></div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {!!filteredPosts &&
          filteredPosts.map((post: Post) => (
            <Link href={`/posts/${post.slug}`} key={post._id} className="group">
              <Card className="h-full overflow-hidden border border-indigo-100/50 bg-gradient-to-br from-white via-indigo-50/50 to-purple-50/50 shadow-md transition-all duration-300 hover:shadow-xl dark:border-gray-800/50 dark:from-gray-900/80 dark:via-indigo-950/50 dark:to-purple-950/50">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                {post.img && (
                  <div className="relative h-48 overflow-hidden">
                    <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <Image
                      src={post.img}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <CardHeader className="space-y-3">
                  <Badge className="w-fit rounded-full bg-gradient-to-r from-indigo-600/90 to-indigo-500 px-3 py-1 text-xs font-medium text-white shadow-sm transition-all hover:from-indigo-500 hover:to-purple-500 dark:from-indigo-400 dark:to-purple-400">
                    <p className="first-letter:uppercase">{post.category}</p>
                  </Badge>
                  <h4 className="line-clamp-2 bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-lg font-bold text-transparent transition-all group-hover:from-indigo-600 group-hover:to-purple-600 dark:from-white dark:to-gray-200 dark:group-hover:from-indigo-400 dark:group-hover:to-purple-400">
                    {post.title}
                  </h4>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    {post.desc}
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300">
                    <div className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-1.5">
                      <Calendar size={12} className="text-white" />
                    </div>
                    <span className="font-medium">
                      {format(new Date(post.createdAt), 'MMMM d, yyyy')}
                    </span>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="flex h-[200px] w-full items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30">
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
            No related posts found
          </p>
        </div>
      )}
    </div>
  );
};

export default RelatedPosts;

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Badge } from '../ui/badge';
import { getFeaturedPosts } from '@/lib/api/fetch-posts';
import { Post } from '@/lib/types/types';
import { format } from 'date-fns';

const FeaturedPost = async () => {
  const posts: Post[] = await getFeaturedPosts();
  const featuredPosts = posts.slice(0, 3);

  return (
    <div className="w-full py-8">
      <div className="mb-8 flex items-center gap-4">
        <h2 className="relative bg-gradient-to-r from-gray-900 via-indigo-800 to-indigo-600 bg-clip-text text-2xl font-bold text-transparent dark:from-white dark:via-indigo-300 dark:to-indigo-500">
          Featured Posts
          <span className="absolute -bottom-2 left-0 h-1 w-24 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"></span>
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-indigo-100 via-purple-50 to-transparent dark:from-indigo-800/50 dark:via-purple-900/30 dark:to-transparent"></div>
      </div>
      {featuredPosts && featuredPosts.length > 0 && (
        <Carousel className="w-full">
          <CarouselContent>
            {featuredPosts.map((post: Post) => (
              <CarouselItem
                key={post._id}
                className="md:basis-4/5 lg:basis-3/4"
              >
                <div className="group relative overflow-hidden rounded-xl border border-indigo-100/50 bg-gradient-to-br from-white via-indigo-50/50 to-purple-50/50 shadow-md backdrop-blur-sm transition-all hover:shadow-xl dark:border-gray-800/50 dark:from-gray-900/80 dark:via-indigo-950/50 dark:to-purple-950/50">
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                  <div className="flex h-full flex-col md:flex-row">
                    {/* Image section */}
                    <div className="relative h-60 overflow-hidden md:h-auto md:w-2/5">
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      <Image
                        src={post.img}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute left-4 top-4 z-10">
                        <Badge className="rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 px-3 py-1 text-xs text-white shadow-lg">
                          <p className="first-letter:uppercase">
                            {post.category}
                          </p>
                        </Badge>
                      </div>
                    </div>

                    {/* Content section */}
                    <div className="relative flex flex-col justify-between p-6 md:w-3/5">
                      <div>
                        <Link href={`/posts/${post.slug}`}>
                          <h3 className="mb-3 bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-xl font-bold text-transparent transition-all duration-300 hover:from-indigo-600 hover:to-purple-600 dark:from-white dark:to-gray-200 dark:hover:from-indigo-400 dark:hover:to-purple-400">
                            {post.title}
                          </h3>
                        </Link>
                        <p className="mb-4 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
                          {post.desc}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-300">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-1">
                            <User size={12} className="text-white" />
                          </div>
                          <span>
                            {post.user?.firstName} {post.user?.lastName}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-1">
                            <Calendar size={12} className="text-white" />
                          </div>
                          <span>
                            {format(new Date(post.createdAt), 'MMMM d, yyyy')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-4 flex justify-end gap-2">
            <CarouselPrevious className="static transform-none border-indigo-200 bg-gradient-to-r from-white to-indigo-50 hover:border-indigo-300 hover:from-indigo-50 hover:to-indigo-100 dark:border-gray-700 dark:from-gray-800 dark:to-indigo-950 dark:hover:border-indigo-800" />
            <CarouselNext className="static transform-none border-indigo-200 bg-gradient-to-r from-white to-indigo-50 hover:border-indigo-300 hover:from-indigo-50 hover:to-indigo-100 dark:border-gray-700 dark:from-gray-800 dark:to-indigo-950 dark:hover:border-indigo-800" />
          </div>
        </Carousel>
      )}
      {featuredPosts.length === 0 && (
        <div className="flex h-[200px] w-full items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30">
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
            No featured posts found
          </p>
        </div>
      )}
    </div>
  );
};

export default FeaturedPost;

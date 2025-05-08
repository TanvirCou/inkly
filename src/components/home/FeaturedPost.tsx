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
      <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">
        Featured Posts
      </h2>
      <Carousel className="w-full">
        <CarouselContent>
          {featuredPosts.map((post: Post) => (
            <CarouselItem key={post._id} className="md:basis-4/5 lg:basis-3/4">
              <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md dark:border-gray-800 dark:bg-primary-foreground">
                <div className="flex h-full flex-col md:flex-row">
                  {/* Image section */}
                  <div className="relative h-60 md:h-auto md:w-2/5">
                    <Image
                      src={post.img}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute left-4 top-4">
                      <Badge className="pointer-events-none rounded-full bg-indigo-600 px-3 py-1 text-xs text-white">
                        <p className="first-letter:uppercase">
                          {post.category}
                        </p>
                      </Badge>
                    </div>
                  </div>

                  {/* Content section */}
                  <div className="flex flex-col justify-between p-6 md:w-3/5">
                    <div>
                      <Link href={`/posts/${post.slug}`}>
                        <h3 className="mb-3 text-xl font-bold text-gray-800 transition-colors hover:text-indigo-600 dark:text-white">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="mb-4 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
                        {post.desc}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-white">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-indigo-500" />
                        <span>{post.user.username}</span>
                      </div>

                      <div className="flex items-center gap-2 dark:text-white">
                        <Calendar size={14} className="text-indigo-500" />
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
          <CarouselPrevious className="static transform-none border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50" />
          <CarouselNext className="static transform-none border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50" />
        </div>
      </Carousel>
    </div>
  );
};

export default FeaturedPost;

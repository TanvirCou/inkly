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

// Sample featured posts data
const featuredPosts = [
  {
    id: 1,
    title: "The Future of Web Development: What's Coming in 2024",
    description:
      'Explore the upcoming trends and technologies that will shape the future of web development in the coming year.',
    image:
      'https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    author: 'John Smith',
    createdAt: 'Dec 15, 2023',
    category: 'Development',
  },
  {
    id: 2,
    title: 'Mastering CSS Grid: Advanced Layout Techniques',
    description:
      'Learn how to create complex, responsive layouts using the power of CSS Grid with these expert techniques.',
    image:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
    author: 'Emma Johnson',
    createdAt: 'Dec 10, 2023',
    category: 'Web Design',
  },
  {
    id: 3,
    title: 'Building Scalable Applications with Next.js',
    description:
      'Discover how to leverage Next.js to build fast, scalable web applications that can handle growing user demands.',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    author: 'Alex Chen',
    createdAt: 'Dec 5, 2023',
    category: 'Development',
  },
];

const FeaturedPost = () => {
  return (
    <div className="w-full py-8">
      <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">
        Featured Posts
      </h2>
      <Carousel className="w-full">
        <CarouselContent>
          {featuredPosts.map((post) => (
            <CarouselItem key={post.id} className="md:basis-4/5 lg:basis-3/4">
              <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md dark:border-gray-800 dark:bg-primary-foreground">
                <div className="flex h-full flex-col md:flex-row">
                  {/* Image section */}
                  <div className="relative h-60 md:h-auto md:w-2/5">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute left-4 top-4">
                      <Badge className="pointer-events-none rounded-full bg-indigo-600 px-3 py-1 text-xs text-white">
                        {post.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Content section */}
                  <div className="flex flex-col justify-between p-6 md:w-3/5">
                    <div>
                      <Link href={`/post/${post.id}`}>
                        <h3 className="mb-3 text-xl font-bold text-gray-800 transition-colors hover:text-indigo-600 dark:text-white">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="mb-4 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
                        {post.description}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-white">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-indigo-500" />
                        <span>{post.author}</span>
                      </div>

                      <div className="flex items-center gap-2 dark:text-white">
                        <Calendar size={14} className="text-indigo-500" />
                        <span>{post.createdAt}</span>
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

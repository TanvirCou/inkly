import React from 'react';
import PostItem from './PostItem';
import Link from 'next/link';
import { getAllPosts } from '@/lib/api/fetch-posts';
import { Post } from '@/lib/types/types';
// Sample recent posts data
// export const recentPosts = [
//   {
//     id: 1,
//     title: 'How to Build a Responsive UI with Tailwind CSS',
//     description:
//       "Learn the fundamentals of creating beautiful, responsive user interfaces using Tailwind CSS's utility-first approach.",
//     image:
//       'https://images.unsplash.com/photo-1555066931-bf19f8fd1085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
//     author: 'Sarah Wilson',
//     createdAt: 'Jan 5, 2024',
//     category: 'Web Design',
//     readTime: '8',
//   },
//   {
//     id: 2,
//     title: 'The Complete Guide to TypeScript Generics',
//     description:
//       'Master TypeScript generics to write more reusable, type-safe code. This comprehensive guide covers everything from basic to advanced concepts.',
//     image:
//       'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
//     author: 'Michael Brown',
//     createdAt: 'Jan 2, 2024',
//     category: 'Development',
//     readTime: '12',
//   },
//   {
//     id: 3,
//     title: 'Optimizing Database Performance in High-Traffic Applications',
//     description:
//       'Discover proven strategies for optimizing database performance in applications that handle millions of requests daily.',
//     image:
//       'https://images.unsplash.com/photo-1555066931-bf19f8fd1085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
//     author: 'Lisa Chen',
//     createdAt: 'Dec 28, 2023',
//     category: 'Databases',
//     readTime: '10',
//   },
//   {
//     id: 4,
//     title: 'The Rise of AI in Modern Web Development',
//     description:
//       'Explore how artificial intelligence is transforming web development, from automated coding to intelligent user experiences.',
//     image:
//       'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
//     author: 'David Patel',
//     createdAt: 'Dec 20, 2023',
//     category: 'Development',
//     readTime: '9',
//   },
// ];

const Posts = async () => {
  const posts: Post[] = await getAllPosts();
  const recentPosts = posts.slice(0, 5);

  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-4">
          <h2 className="relative bg-gradient-to-r from-gray-900 via-indigo-800 to-indigo-600 bg-clip-text text-2xl font-bold text-transparent dark:from-white dark:via-indigo-300 dark:to-indigo-500">
            Recent Posts
            <span className="absolute -bottom-2 left-0 h-1 w-20 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"></span>
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-indigo-100 via-purple-50 to-transparent dark:from-indigo-800/50 dark:via-purple-900/30 dark:to-transparent"></div>
          <Link
            href="/posts"
            className="group relative inline-flex items-center gap-1 text-sm font-medium text-gray-700 transition-colors dark:text-gray-300"
          >
            View all posts
            <span className="relative transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
            <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        <div className="space-y-6">
          {recentPosts && recentPosts.length > 0 ? (
            recentPosts.map((post: Post) => (
              <PostItem key={post._id} post={post} />
            ))
          ) : (
            <div className="flex h-64 w-full items-center justify-center rounded-xl border border-indigo-100/50 bg-gradient-to-br from-white via-indigo-50/50 to-purple-50/50 dark:border-gray-800/50 dark:from-gray-900/80 dark:via-indigo-950/50 dark:to-purple-950/50">
              <p className="bg-gradient-to-r from-gray-600 to-indigo-600 bg-clip-text text-lg font-medium text-transparent dark:from-gray-300 dark:to-indigo-400">
                No posts found
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Posts;

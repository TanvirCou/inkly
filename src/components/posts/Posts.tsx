import React from 'react';
import PostItem from './PostItem';

// Sample recent posts data
const recentPosts = [
  {
    id: 1,
    title: 'How to Build a Responsive UI with Tailwind CSS',
    description:
      "Learn the fundamentals of creating beautiful, responsive user interfaces using Tailwind CSS's utility-first approach.",
    image:
      'https://images.unsplash.com/photo-1555066931-bf19f8fd1085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    author: 'Sarah Wilson',
    createdAt: 'Jan 5, 2024',
    category: 'Web Design',
    readTime: '8',
  },
  {
    id: 2,
    title: 'The Complete Guide to TypeScript Generics',
    description:
      'Master TypeScript generics to write more reusable, type-safe code. This comprehensive guide covers everything from basic to advanced concepts.',
    image:
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    author: 'Michael Brown',
    createdAt: 'Jan 2, 2024',
    category: 'Development',
    readTime: '12',
  },
  {
    id: 3,
    title: 'Optimizing Database Performance in High-Traffic Applications',
    description:
      'Discover proven strategies for optimizing database performance in applications that handle millions of requests daily.',
    image:
      'https://images.unsplash.com/photo-1555066931-bf19f8fd1085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    author: 'Lisa Chen',
    createdAt: 'Dec 28, 2023',
    category: 'Databases',
    readTime: '10',
  },
  {
    id: 4,
    title: 'The Rise of AI in Modern Web Development',
    description:
      'Explore how artificial intelligence is transforming web development, from automated coding to intelligent user experiences.',
    image:
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    author: 'David Patel',
    createdAt: 'Dec 20, 2023',
    category: 'Development',
    readTime: '9',
  },
];

const Posts = () => {
  return (
    <section className="w-full py-10">
      <div className="container mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Recent Posts
          </h2>
          <a
            href="/posts"
            className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-800"
          >
            View all posts →
          </a>
        </div>

        <div className="space-y-6">
          {recentPosts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Posts;

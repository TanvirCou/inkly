import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

// Mock data for the post
const mockPost = {
  title: 'Building Modern Web Applications with Next.js and React',
  description:
    'Explore the best practices and strategies for creating high-performance, scalable web applications using Next.js and React. Learn about SSR, SSG, and more.',
  image:
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  content: `
    <p>Next.js has emerged as one of the most popular frameworks for building React applications. It provides a powerful set of features that make it easy to create high-quality web experiences.</p>
    
    <h2>Server-Side Rendering</h2>
    <p>One of the core features of Next.js is its support for server-side rendering (SSR). SSR allows the initial HTML of a page to be generated on the server, which can lead to better performance and SEO.</p>
    
    <p>With SSR, users see the content of your page much faster, especially on slower connections or devices. Search engines can also better index your content, improving your site's visibility.</p>
    
    <h2>Static Site Generation</h2>
    <p>Next.js also supports static site generation (SSG), which allows you to pre-render pages at build time. This can lead to even better performance, as the pages are already generated and can be served directly from a CDN.</p>
    
    <p>SSG is ideal for pages that don't change frequently, such as blog posts, documentation, or landing pages. It provides the benefits of server rendering without the overhead of generating the page on each request.</p>
    
    <h2>API Routes</h2>
    <p>Another powerful feature of Next.js is its support for API routes. API routes allow you to create serverless functions that can be used to handle API requests.</p>
    
    <p>This makes it easy to create a backend for your application without having to set up a separate server. You can use API routes to handle form submissions, authenticate users, or fetch data from external sources.</p>
    
    <h2>Conclusion</h2>
    <p>Next.js provides a comprehensive solution for building modern web applications. Its support for SSR, SSG, and API routes makes it a great choice for a wide range of projects.</p>
    
    <p>Whether you're building a simple blog or a complex web application, Next.js has the tools you need to create a high-quality user experience.</p>
  `,
  author: {
    name: 'Sarah Johnson',
    image: 'https://github.com/shadcn.png',
    bio: 'Full-stack developer with a passion for creating beautiful and functional web applications. Specialized in React, Next.js, and TypeScript.',
    role: 'Senior Developer',
    social: {
      twitter: 'sarahjohnson',
      facebook: 'sarahjohnsondev',
      instagram: 'sarahjdev',
    },
  },
  publishedAt: 'January 15, 2024',
  readTime: '8 min read',
  category: 'Development',
};

const PostDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  console.log(slug);

  // In a real application, you would fetch the post data based on the slug
  // For now, we'll use the mock data
  const post = mockPost;

  return (
    <article className="container mx-auto max-w-6xl px-4 py-10">
      {/* Post Header - Horizontal layout with title/desc on left, image on right */}
      <div className="mb-10 flex flex-col gap-8 lg:flex-row">
        {/* Title and metadata */}
        <div className="flex flex-col justify-center lg:w-1/2">
          <Badge className="mb-4 self-start bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-700 dark:text-indigo-100">
            {post.category}
          </Badge>

          <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            {post.title}
          </h1>

          <p className="mb-6 text-justify text-gray-600 dark:text-gray-300">
            {post.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-100">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-indigo-500" />
              <span>{post.publishedAt}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock size={16} className="text-indigo-500" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        {/* Featured image */}
        <div className="relative h-[300px] overflow-hidden rounded-xl md:h-[400px] lg:w-1/2">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Post Content and Author - Horizontal layout with sticky author details */}
      <div className="flex flex-col-reverse gap-8 lg:flex-row">
        {/* Main content */}
        <div className="lg:w-3/4">
          <div
            className="prose prose-indigo lg:prose-lg max-w-none text-justify dark:text-gray-300"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="mt-10 border-t border-gray-100 pt-6">
            <h3 className="mb-3 text-lg font-semibold">Related Tags</h3>
            <div className="flex flex-wrap gap-2">
              <Badge className="cursor-pointer bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-indigo-700 dark:text-indigo-100 dark:hover:bg-indigo-100 dark:hover:text-indigo-700">
                Next.js
              </Badge>
              <Badge className="cursor-pointer bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-indigo-700 dark:text-indigo-100 dark:hover:bg-indigo-100 dark:hover:text-indigo-700">
                React
              </Badge>
              <Badge className="cursor-pointer bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-indigo-700 dark:text-indigo-100 dark:hover:bg-indigo-100 dark:hover:text-indigo-700">
                SSR
              </Badge>
              <Badge className="cursor-pointer bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-indigo-700 dark:text-indigo-100 dark:hover:bg-indigo-100 dark:hover:text-indigo-700">
                Frontend
              </Badge>
              <Badge className="cursor-pointer bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-indigo-700 dark:text-indigo-100 dark:hover:bg-indigo-100 dark:hover:text-indigo-700">
                Web Development
              </Badge>
            </div>
          </div>
        </div>

        {/* Author details - Sticky */}
        <div className="lg:w-1/4">
          <div className="rounded-xl border border-gray-100 bg-indigo-50 p-6 shadow-sm dark:border-gray-800 dark:bg-primary-foreground lg:sticky lg:top-20">
            <div className="mb-4 flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={post.author.image} alt={post.author.name} />
                <AvatarFallback>
                  {post.author.name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {post.author.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {post.author.role}
                </p>
              </div>
            </div>

            <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
              {post.author.bio}
            </p>

            <div className="flex flex-col gap-4">
              <Link
                href={`/author/${post.author.name.toLowerCase().replace(' ', '-')}`}
                className="rounded-md bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-indigo-700"
              >
                View All Posts
              </Link>

              {/* Social Media Links */}
              <div className="flex items-center justify-center gap-4 border-t border-gray-100 pt-4 dark:border-gray-800">
                <a
                  href={`https://twitter.com/${post.author.social.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors duration-300 hover:bg-blue-100 hover:text-blue-500 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-blue-400"
                  aria-label="Twitter"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href={`https://facebook.com/${post.author.social.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors duration-300 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-blue-500"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href={`https://instagram.com/${post.author.social.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors duration-300 hover:bg-pink-100 hover:text-pink-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-pink-400"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostDetailPage;

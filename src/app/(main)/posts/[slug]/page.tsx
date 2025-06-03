import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Facebook, Instagram, Twitter } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

import { getSinglePost } from '@/lib/api/fetch-posts';
import { Post } from '@/lib/types/types';
import { format } from 'date-fns';
import CreateComment from '@/components/comments/CreateComment';
import AllComments from '@/components/comments/AllComments';
import RelatedPosts from '@/components/posts/RelatedPosts';
import SavedPostButton from '@/components/posts/SavedPostButton';
import { getSingleUser } from '@/lib/api/fetch-users';
import { auth } from '@clerk/nextjs/server';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post: Post = await getSinglePost(slug);

  return {
    title: `${post.title} | Inkly`,
    description: post.desc,
  };
}

const PostDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const post: Post = await getSinglePost(slug);
  const currentUser = await getSingleUser();

  const { sessionClaims } = await auth();

  const role = (sessionClaims?.metadata as { role?: string })?.role;

  return (
    <article className="container mx-auto max-w-6xl px-4 py-10">
      {/* Post Header - Horizontal layout with title/desc on left, image on right */}
      <div className="relative mb-16 rounded-2xl bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 p-8 shadow-xl dark:from-gray-900/80 dark:via-indigo-950/30 dark:to-purple-950/30 lg:p-12">
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
          {/* Title and metadata */}
          <div className="flex flex-col justify-center lg:w-1/2">
            <div className="mb-6 flex items-center justify-between">
              <Badge className="rounded-full bg-gradient-to-r from-indigo-600/90 to-indigo-500 px-4 py-1.5 text-sm font-medium text-white shadow-lg transition-all hover:from-indigo-500 hover:to-purple-500 dark:from-indigo-400 dark:to-purple-400">
                <p className="first-letter:uppercase">{post.category}</p>
              </Badge>
              {role === 'user' && (
                <SavedPostButton
                  postId={post._id}
                  savedPosts={currentUser.savedPosts}
                />
              )}
            </div>

            <h1 className="mb-6 bg-gradient-to-br from-gray-900 via-indigo-800 to-indigo-600 bg-clip-text text-3xl font-bold text-transparent dark:from-white dark:via-indigo-300 dark:to-indigo-500 md:text-5xl">
              {post.title}
            </h1>

            <p className="text-md mb-6 leading-relaxed text-gray-600 dark:text-gray-300 md:text-lg">
              {post.desc}
            </p>

            <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-2">
                  <Calendar size={16} className="text-white" />
                </div>
                <span className="font-medium">
                  {format(new Date(post.createdAt), 'MMMM d, yyyy')}
                </span>
              </div>
            </div>
          </div>

          {/* Featured image */}
          {post.img && (
            <div className="relative h-[400px] overflow-hidden rounded-xl shadow-2xl lg:w-1/2">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <Image
                src={post.img}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </div>

      {/* Main Content and Author Section */}
      <div className="flex flex-col-reverse gap-12 lg:flex-row">
        {/* Main content */}
        <div className="lg:w-3/4">
          <div
            className="prose prose-lg prose-indigo dark:prose-invert prose-headings:bg-gradient-to-br prose-headings:from-gray-900 prose-headings:to-gray-600 prose-headings:bg-clip-text prose-headings:text-transparent prose-headings:dark:from-white prose-headings:dark:to-gray-200 prose-a:text-indigo-600 prose-a:dark:text-indigo-400 max-w-none text-justify"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-16 border-t border-indigo-100 pt-12 dark:border-indigo-800">
            <CreateComment postId={post._id} />
            <AllComments postId={post._id} />
          </div>
        </div>

        {/* Author details - Sticky */}
        <div className="lg:w-1/4">
          <div className="rounded-xl border border-indigo-100/50 bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 p-8 shadow-xl backdrop-blur-sm dark:border-indigo-800/50 dark:from-gray-900/80 dark:via-indigo-950/30 dark:to-purple-950/30 lg:sticky lg:top-24">
            <div className="mb-6 flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 p-[2px] shadow-lg">
                <Avatar className="h-full w-full">
                  <AvatarImage
                    src={post.user?.img}
                    alt={post.user?.firstName}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-indigo-100 to-purple-100 uppercase dark:from-indigo-900 dark:to-purple-900">
                    {post.user?.firstName.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div>
                <h3 className="bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-lg font-bold text-transparent dark:from-white dark:to-gray-200">
                  {post.user?.firstName} {post.user?.lastName}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {post.user?.title}
                </p>
              </div>
            </div>

            <p className="mb-8 text-base text-gray-600 dark:text-gray-300">
              {post.user?.bio}
            </p>

            <div className="flex flex-col gap-6">
              <Link
                href={`/posts?author=${post.user?.username}`}
                className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-3 text-center text-sm font-medium text-white shadow-lg transition-all hover:from-indigo-500 hover:to-purple-500"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-full bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                </div>
                <span className="relative">View All Posts</span>
              </Link>

              {/* Social Media Links */}
              <div className="flex items-center justify-center gap-4 border-t border-indigo-100 pt-6 dark:border-indigo-800">
                {post.user?.twitterLink && (
                  <a
                    href={post.user?.twitterLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg transition-all duration-300 hover:from-blue-100 hover:to-blue-50 dark:from-gray-800 dark:to-gray-700 dark:hover:from-blue-900 dark:hover:to-blue-800"
                    aria-label="Twitter"
                  >
                    <Twitter
                      size={18}
                      className="text-gray-600 transition-colors group-hover:text-blue-500 dark:text-gray-300 dark:group-hover:text-blue-400"
                    />
                  </a>
                )}
                {post.user?.fbLink && (
                  <a
                    href={post.user?.fbLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg transition-all duration-300 hover:from-blue-100 hover:to-blue-50 dark:from-gray-800 dark:to-gray-700 dark:hover:from-blue-900 dark:hover:to-blue-800"
                    aria-label="Facebook"
                  >
                    <Facebook
                      size={18}
                      className="text-gray-600 transition-colors group-hover:text-blue-600 dark:text-gray-300 dark:group-hover:text-blue-500"
                    />
                  </a>
                )}
                {post.user?.instagramLink && (
                  <a
                    href={post.user?.instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg transition-all duration-300 hover:from-pink-100 hover:to-pink-50 dark:from-gray-800 dark:to-gray-700 dark:hover:from-pink-900 dark:hover:to-pink-800"
                    aria-label="Instagram"
                  >
                    <Instagram
                      size={18}
                      className="text-gray-600 transition-colors group-hover:text-pink-600 dark:text-gray-300 dark:group-hover:text-pink-400"
                    />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <RelatedPosts category={post.category} postId={post._id} />
      </div>
    </article>
  );
};

export default PostDetailPage;

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
  Trash2,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

import { getSinglePost } from '@/lib/api/fetch-posts';
import { Post } from '@/lib/types/types';
import { format } from 'date-fns';
import CreateComment from '@/components/comments/CreateComment';
import AllComments from '@/components/comments/AllComments';
import RelatedPosts from '@/components/posts/RelatedPosts';
const PostDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const post: Post = await getSinglePost(slug);

  console.log(post);

  return (
    <article className="container mx-auto max-w-6xl px-4 py-10">
      {/* Post Header - Horizontal layout with title/desc on left, image on right */}
      <div className="mb-10 flex flex-col gap-8 lg:flex-row">
        {/* Title and metadata */}
        <div className="flex flex-col justify-center lg:w-1/2">
          <Badge className="mb-4 self-start bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-700 dark:text-indigo-100">
            <p className="first-letter:uppercase">{post.category}</p>
          </Badge>

          <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            {post.title}
          </h1>

          <p className="mb-6 text-justify text-gray-600 dark:text-gray-300">
            {post.desc}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-100">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-indigo-500" />
              <span>{format(new Date(post.createdAt), 'MMMM d, yyyy')}</span>
            </div>
          </div>
        </div>

        {/* Featured image */}
        <div className="relative h-[300px] overflow-hidden rounded-xl md:h-[400px] lg:w-1/2">
          <Image
            src={post.img}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Main Content and Author Section */}
      <div className="flex flex-col-reverse gap-8 lg:flex-row">
        {/* Main content */}
        <div className="lg:w-3/4">
          <div
            className="prose prose-indigo lg:prose-lg max-w-none text-justify dark:text-gray-300"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-10 border-t border-gray-800 pt-6 dark:border-gray-100">
            <CreateComment postId={post._id} />

            <AllComments postId={post._id} />
          </div>
        </div>

        {/* Author details - Sticky */}
        <div className="lg:w-1/4">
          <div className="rounded-xl border border-gray-100 bg-indigo-50 p-6 shadow-sm dark:border-gray-800 dark:bg-primary-foreground lg:sticky lg:top-20">
            <div className="mb-4 flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={post.user?.img} alt={post.user?.firstName} />
                <AvatarFallback className="uppercase">
                  {post.user?.firstName.substring(0, 2)}
                </AvatarFallback>
              </Avatar>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {post.user?.firstName} {post.user.lastName}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Senior Developer
                </p>
              </div>
            </div>

            <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque
              iure exercitationem tempora atque inventore laudantium, expedita.
            </p>

            <div className="flex flex-col gap-4">
              <Link
                href={`/posts?author=${post.user?.username}`}
                className="rounded-md bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-indigo-700"
              >
                View All Posts
              </Link>

              {/* Social Media Links */}
              <div className="flex items-center justify-center gap-4 border-t border-gray-100 pt-4 dark:border-gray-800">
                <a
                  href={`/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors duration-300 hover:bg-blue-100 hover:text-blue-500 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-blue-400"
                  aria-label="Twitter"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href={`/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors duration-300 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-blue-500"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href={`/`}
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

      <RelatedPosts category={post.category} postId={post._id} />
    </article>
  );
};

export default PostDetailPage;

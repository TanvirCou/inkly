import EditPost from '@/components/shared/edit-post/EditPost';
import { getSinglePost } from '@/lib/api/fetch-posts';
import { Category, Post } from '@/lib/types/types';
import { getAllCategories } from '@/lib/api/fetch-categories';
import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
export const metadata: Metadata = {
  title: 'Edit Post | Inkly',
  description:
    'Make changes to your existing blog post and update it on Inkly.',
};

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const post: Post = await getSinglePost(slug);
  const categories: Category[] = await getAllCategories();

  if (!post) {
    return notFound();
  }

  return (
    <div>
      <EditPost post={post} categories={categories} />
    </div>
  );
};

export default page;

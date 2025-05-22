import EditPost from '@/components/shared/edit-post/EditPost';
import { getSinglePost } from '@/lib/api/fetch-posts';
import { Category, Post } from '@/lib/types/types';
import { getAllCategories } from '@/lib/api/fetch-categories';
import React from 'react';

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const post: Post = await getSinglePost(slug);
  const categories: Category[] = await getAllCategories();

  return (
    <div>
      <EditPost post={post} categories={categories} />
    </div>
  );
};

export default page;

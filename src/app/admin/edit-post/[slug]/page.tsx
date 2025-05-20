import EditPost from '@/components/admin/shared/edit-post/EditPost';
import { getSinglePost } from '@/lib/api/fetch-posts';
import { Post } from '@/lib/types/types';
import React from 'react';

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const post: Post = await getSinglePost(slug);

  return (
    <div>
      <EditPost post={post} />
    </div>
  );
};

export default page;

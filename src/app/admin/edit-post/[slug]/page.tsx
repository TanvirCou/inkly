import EditPost from '@/components/shared/edit-post/EditPost';
import { getAllCategories } from '@/lib/api/fetch-categories';
import { getSinglePost } from '@/lib/api/fetch-posts';
import { Post, Category } from '@/lib/types/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
export const metadata: Metadata = {
  title: 'Edit Post | Inkly Admin',
  description:
    'Modify and update any blog post on Inkly through the admin panel.',
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

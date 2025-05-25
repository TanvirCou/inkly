import CreatePostForm from '@/components/shared/create-post/CreatePostForm';
import { getAllCategories } from '@/lib/api/fetch-categories';
import { Category } from '@/lib/types/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Post | Inkly',
  description:
    "Share your thoughts with the world. Use Inkly's editor to write and publish your own blog post.",
};

const CreatePostPage = async () => {
  const categories: Category[] = await getAllCategories();

  return (
    <div className="flex w-full flex-col items-center gap-2 px-4 py-4 sm:px-6 md:px-8 lg:px-16">
      <div className="mb-8 flex items-center gap-4">
        <p className="relative text-3xl font-bold">
          <span className="bg-gradient-to-r from-gray-900 via-indigo-800 to-indigo-600 bg-clip-text text-transparent dark:from-white dark:via-indigo-300 dark:to-indigo-500">
            Create Blogs
          </span>
          <span className="absolute -bottom-2 left-0 right-0 mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"></span>
        </p>
        <div className="h-px flex-1 bg-gradient-to-r from-indigo-100 via-purple-50 to-transparent dark:from-indigo-800/50 dark:via-purple-900/30 dark:to-transparent"></div>
      </div>
      <CreatePostForm categories={categories} />
    </div>
  );
};

export default CreatePostPage;

import CreatePostForm from '@/components/shared/create-post/CreatePostForm';
import { getAllCategories } from '@/lib/api/fetch-categories';
import { Category } from '@/lib/types/types';

const CreatePostPage = async () => {
  const categories: Category[] = await getAllCategories();

  return (
    <div className="flex w-full flex-col items-center gap-2 px-4 py-4 sm:px-6 md:px-8 lg:px-16">
      <p className="text-2xl font-bold text-gray-800 dark:text-white">
        Create Blogs
      </p>
      <CreatePostForm categories={categories} />
    </div>
  );
};

export default CreatePostPage;

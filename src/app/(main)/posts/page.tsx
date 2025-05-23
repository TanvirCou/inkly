import AllPost from '@/components/posts/AllPost';
import { getAllPosts } from '@/lib/api/fetch-posts';
import { Post } from '@/lib/types/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Posts | Inkly',
  description:
    'Explore a wide range of blog posts on Inkly. Discover new ideas, insights, and stories from our community.',
};

const PostPage = async () => {
  const posts: Post[] = await getAllPosts();
  return (
    <div>
      <AllPost data={posts} />
    </div>
  );
};

export default PostPage;

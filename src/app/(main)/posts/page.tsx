import AllPost from '@/components/posts/AllPost';
import { getAllPosts } from '@/lib/api/fetch-posts';
import { Post } from '@/lib/types/types';
const PostPage = async () => {
  const posts: Post[] = await getAllPosts();
  return (
    <div>
      <AllPost data={posts} />
    </div>
  );
};

export default PostPage;

import Image from 'next/image';
import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '../ui/badge';
import { Calendar } from 'lucide-react';
import { getRelatedPosts } from '@/lib/api/fetch-posts';
import { Post } from '@/lib/types/types';
import { format } from 'date-fns';
const RelatedPosts = async ({
  category,
  postId,
}: {
  category: string;
  postId: string;
}) => {
  const posts: Post[] = await getRelatedPosts(category);
  const filteredPosts = posts.filter((post: Post) => post._id !== postId);
  return (
    <div className="mt-12 border-t border-gray-800 pt-6 dark:border-gray-100">
      <h3 className="mb-6 text-2xl font-semibold">Related Posts</h3>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {!!filteredPosts &&
          filteredPosts.map((post: Post) => (
            <Card key={post._id} className="overflow-hidden">
              {post.img && (
                <div className="relative h-48">
                  <Image
                    src={post.img}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <Badge className="mb-2 w-fit bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-700 dark:text-indigo-100">
                  <p className="first-letter:uppercase">{post.category}</p>
                </Badge>
                <h4 className="line-clamp-2 text-lg font-semibold">
                  {post.title}
                </h4>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
                  {post.desc}
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar size={14} />
                  <span>{format(post.createdAt, 'MMM d, yyyy')}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
      </div>
      {filteredPosts.length === 0 && (
        <div className="flex h-[200px] w-full items-center justify-center">
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
            No related posts found
          </p>
        </div>
      )}
    </div>
  );
};

export default RelatedPosts;

'use client';
import PostItem from '@/components/posts/PostItem';
import FilterSearch from '@/components/shared/search/FilterSearch';
import Searchbar from '@/components/shared/search/Searchbar';
import React, { useState, useEffect } from 'react';
import { Post } from '@/lib/types/types';
import { useRouter, useSearchParams } from 'next/navigation';

type AllPostProps = {
  data: Post[];
};

const AllPost = ({ data }: AllPostProps) => {
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>(data);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = () => {
    setOpen((prev: boolean) => !prev);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('cat') || '';
    const sort = params.get('sort') || '';
    const search = params.get('search') || '';
    let url = `${process.env.NEXT_PUBLIC_API_URL}/posts?`;
    if (cat) url += `cat=${cat}&`;
    if (sort) url += `sort=${sort}&`;
    if (search) url += `search=${search}`;
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .finally(() => setLoading(false));
  }, [searchParams, data]);

  const handleCategory = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    console.log(params);

    if (cat) {
      params.set('cat', cat);
    } else {
      params.delete('cat');
    }
    router.replace(`?${params.toString()}`);
  };

  const handleFilter = (filterValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (filterValue) {
      params.set('sort', filterValue);
    } else {
      params.delete('sort');
    }
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="flex min-h-screen flex-col gap-4 px-4 py-6 sm:px-6 md:px-8 lg:px-16">
      <div className="flex items-center justify-between">
        <h1 className="bg-gradient-to-r from-gray-900 to-indigo-700 bg-clip-text text-2xl font-bold text-transparent dark:from-white dark:to-indigo-400">
          Explore Articles
        </h1>
        <button
          className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-1.5 text-sm text-white shadow-sm transition-all duration-300 hover:shadow-md md:hidden"
          onClick={handleClick}
        >
          {open ? 'Close' : 'Filter & Search'}
        </button>
      </div>

      <div className="flex flex-col-reverse gap-6 md:flex-row">
        {/* Main Content */}
        <div className="w-full md:w-[65%] lg:w-[70%] xl:w-[75%]">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="grid gap-6">
              {posts.map((post: Post) => (
                <PostItem key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="flex h-64 w-full items-center justify-center rounded-xl border border-indigo-100/50 bg-gradient-to-br from-white via-indigo-50/50 to-purple-50/50 dark:border-gray-800/50 dark:from-gray-900/80 dark:via-indigo-950/50 dark:to-purple-950/50">
              <p className="bg-gradient-to-r from-gray-600 to-indigo-600 bg-clip-text text-lg font-medium text-transparent dark:from-gray-300 dark:to-indigo-400">
                No posts found
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div
          className={`${
            open ? 'block' : 'hidden'
          } md:block md:w-[35%] lg:w-[30%] xl:w-[25%]`}
        >
          <div className="sticky top-4 flex flex-col gap-4">
            <div className="relative overflow-hidden rounded-xl border border-indigo-100/50 bg-gradient-to-br from-white via-indigo-50/50 to-purple-50/50 px-4 py-2 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md dark:border-gray-800/50 dark:from-gray-900/80 dark:via-indigo-950/50 dark:to-purple-950/50">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5"></div>
              <p className="relative mb-2 bg-gradient-to-r from-gray-800 to-indigo-600 bg-clip-text font-semibold text-transparent dark:from-white dark:to-indigo-400">
                Search Posts
              </p>
              <Searchbar type="posts" />
            </div>

            <FilterSearch onFilterChange={handleFilter} />

            <div className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-indigo-200 hover:scrollbar-thumb-indigo-300 dark:scrollbar-thumb-indigo-800 dark:hover:scrollbar-thumb-indigo-700 relative max-h-[calc(100vh-13rem)] overflow-y-auto rounded-xl border border-indigo-100/50 bg-gradient-to-br from-white via-indigo-50/50 to-purple-50/50 px-4 py-2 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md dark:border-gray-800/50 dark:from-gray-900/80 dark:via-indigo-950/50 dark:to-purple-950/50">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5"></div>
              <p className="sticky top-0 z-10 mb-2 bg-gradient-to-r from-gray-800 to-indigo-600 bg-clip-text font-semibold text-transparent dark:from-white dark:to-indigo-400">
                Categories
              </p>
              <div className="relative flex flex-col gap-2 pb-2 text-sm">
                {[
                  { label: 'All', value: '' },
                  { label: 'Web Design', value: 'web-design' },
                  { label: 'Development', value: 'development' },
                  { label: 'Databases', value: 'databases' },
                  { label: 'Search Engines', value: 'search-engines' },
                  { label: 'Marketing', value: 'marketing' },
                  { label: 'Gaming', value: 'gaming' },
                  { label: 'Football', value: 'football' },
                ].map((category) => (
                  <button
                    key={category.value}
                    onClick={() => handleCategory(category.value)}
                    className="group text-left text-gray-600 transition-colors duration-300 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                  >
                    <span className="relative inline-flex items-center">
                      <span className="relative">{category.label}</span>
                      <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPost;

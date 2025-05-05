'use client';
import PostItem from '@/components/posts/PostItem';
import { recentPosts } from '@/components/posts/Posts';
import FilterSearch from '@/components/shared/search/FilterSearch';
import Searchbar from '@/components/shared/search/Searchbar';
import React, { useState } from 'react';

const PostPage = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev: boolean) => !prev);
  };

  const handleCategory = (cat: string) => {
    console.log(cat);
  };
  return (
    <div className="flex flex-col gap-2 px-4 py-2 sm:px-6 md:px-8 lg:px-16">
      <p className="text-2xl font-bold text-gray-800 dark:text-white">Blogs</p>
      <button
        className="w-max cursor-pointer rounded-md bg-indigo-600 px-4 py-1.5 text-sm text-white md:hidden"
        onClick={handleClick}
      >
        {open ? 'Close' : 'Filter or Search'}
      </button>
      <div className="flex flex-col-reverse gap-4 md:flex-row">
        <div className="mt-2 w-full text-justify md:w-[65%] lg:w-[70%] xl:w-[75%]">
          {recentPosts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>

        <div
          className={`${open ? 'block' : 'hidden'} top-16 h-max w-full px-0 md:sticky md:flex md:w-[35%] md:flex-col md:gap-4 md:px-4 lg:w-[30%] xl:w-[25%]`}
        >
          <div className="flex w-full flex-col rounded-md bg-indigo-50 p-2 dark:bg-primary-foreground">
            <p className="font-semibold text-gray-500 dark:text-gray-400">
              Search
            </p>
            <Searchbar type="posts" />
          </div>

          <FilterSearch />

          <div className="flex w-full flex-col gap-1 rounded-md bg-indigo-50 px-4 py-2 dark:bg-primary-foreground">
            <p className="font-semibold text-gray-500 dark:text-gray-400">
              Catagories
            </p>
            <div className="flex flex-col gap-1 text-sm underline">
              <span
                className="cursor-pointer"
                onClick={() => handleCategory('')}
              >
                All
              </span>
              <span
                className="cursor-pointer"
                onClick={() => handleCategory('web-design')}
              >
                Web Design
              </span>
              <span
                className="cursor-pointer"
                onClick={() => handleCategory('development')}
              >
                Development
              </span>
              <span
                className="cursor-pointer"
                onClick={() => handleCategory('databases')}
              >
                Databases
              </span>
              <span
                className="cursor-pointer"
                onClick={() => handleCategory('search-engines')}
              >
                Search Engines
              </span>
              <span
                className="cursor-pointer"
                onClick={() => handleCategory('marketing')}
              >
                Marketing
              </span>
              <span
                className="cursor-pointer"
                onClick={() => handleCategory('gaming')}
              >
                Gaming
              </span>
              <span
                className="cursor-pointer"
                onClick={() => handleCategory('football')}
              >
                Football
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;

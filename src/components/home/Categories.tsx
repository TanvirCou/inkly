import Link from 'next/link';
import React from 'react';
import Searchbar from '../shared/search/Searchbar';
import { getAllCategories } from '@/lib/api/fetch-categories';
import { Category } from '@/lib/types/types';

const Categories = async () => {
  const categories: Category[] = await getAllCategories();

  return (
    <div className="hidden w-full items-center justify-center gap-x-4 rounded-lg border border-indigo-100 bg-indigo-50 px-5 py-3 dark:border-gray-800 dark:bg-primary-foreground md:flex">
      <div className="flex flex-1 flex-wrap items-center justify-between gap-2">
        <Link
          href="/posts"
          className="duration-400 rounded-2xl px-3 py-1.5 text-sm font-medium text-black transition hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
        >
          All posts
        </Link>
        {categories.map((i: Category) => (
          <Link
            href={`/posts?cat=${i.value}`}
            key={i._id}
            className="duration-400 rounded-2xl px-3 py-1.5 text-sm font-medium text-black transition hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
          >
            {i.label}
          </Link>
        ))}
      </div>

      <span className="text-xl font-medium">|</span>

      <Searchbar />
    </div>
  );
};

export default Categories;

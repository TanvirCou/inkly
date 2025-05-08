import Link from 'next/link';
import React from 'react';
import Searchbar from '../shared/search/Searchbar';

const Categories = () => {
  return (
    <div className="hidden w-full items-center justify-center gap-x-4 rounded-lg border border-indigo-100 bg-indigo-50 px-5 py-3 dark:border-gray-800 dark:bg-primary-foreground md:flex">
      <div className="flex flex-1 flex-wrap items-center justify-between gap-2">
        <Link
          href="/posts"
          className="duration-400 rounded-2xl px-3 py-1.5 text-sm font-medium text-black transition hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
        >
          All posts
        </Link>
        <Link
          href="/posts?cat=web-design"
          className="duration-400 rounded-2xl px-3 py-1.5 text-sm font-medium text-black transition hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
        >
          Web Design
        </Link>
        <Link
          href="/posts?cat=development"
          className="duration-400 rounded-2xl px-3 py-1.5 text-sm font-medium text-black transition hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
        >
          Development
        </Link>
        <Link
          href="/posts?cat=databases"
          className="duration-400 rounded-2xl px-3 py-1.5 text-sm font-medium text-black transition hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
        >
          Databases
        </Link>
        <Link
          href="/posts?cat=search-engines"
          className="duration-400 rounded-2xl px-3 py-1.5 text-sm font-medium text-black transition hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
        >
          Search Engines
        </Link>
        <Link
          href="/posts?cat=marketing"
          className="duration-400 rounded-2xl px-3 py-1.5 text-sm font-medium text-black transition hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
        >
          Marketing
        </Link>
        <Link
          href="/posts?cat=gaming"
          className="duration-400 rounded-2xl px-3 py-1.5 text-sm font-medium text-black transition hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
        >
          E-Sports
        </Link>
        <Link
          href="/posts?cat=football"
          className="duration-400 rounded-2xl px-3 py-1.5 text-sm font-medium text-black transition hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
        >
          Football
        </Link>
      </div>

      <span className="text-xl font-medium">|</span>

      <Searchbar />
    </div>
  );
};

export default Categories;

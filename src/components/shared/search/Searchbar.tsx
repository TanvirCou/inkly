'use client';
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation';

const Searchbar = ({ type }: { type?: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (type === 'posts') {
        const params = new URLSearchParams(searchParams.toString());
        params.set('search', e.currentTarget.value);
        router.replace(`?${params.toString()}`);
      } else {
        const params = new URLSearchParams(searchParams.toString());
        params.set('search', e.currentTarget.value);
        router.replace(`/posts?${params.toString()}`);
      }
    }
  };

  return (
    <div
      className={`group relative flex items-center overflow-hidden rounded-full border border-indigo-100/50 bg-gradient-to-r from-white via-indigo-50/50 to-white px-3 py-1 shadow-sm backdrop-blur-sm transition-all duration-300 focus-within:border-indigo-300 focus-within:shadow-md focus-within:ring-2 focus-within:ring-indigo-100 hover:shadow-md dark:border-gray-800/50 dark:from-gray-900/80 dark:via-indigo-950/30 dark:to-gray-900/80 dark:focus-within:border-indigo-500/50 dark:focus-within:ring-indigo-500/20 ${
        type === 'posts' ? 'mt-2 w-full md:max-w-md' : 'w-48 md:w-64'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      <Search
        size={18}
        className="relative mr-2 text-gray-400 transition-colors duration-300 group-focus-within:text-indigo-500 group-hover:text-indigo-500 dark:text-gray-400 dark:group-focus-within:text-indigo-400 dark:group-hover:text-indigo-400"
      />
      <Input
        type="text"
        placeholder="Search a post..."
        onKeyDown={handleEnter}
        className="relative h-8 w-full border-none bg-transparent text-sm text-gray-700 shadow-none placeholder:text-gray-400 focus:outline-none focus-visible:ring-0 dark:text-gray-200 dark:placeholder:text-gray-500"
      />
    </div>
  );
};

export default Searchbar;

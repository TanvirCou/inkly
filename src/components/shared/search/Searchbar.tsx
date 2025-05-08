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
      className={`flex items-center rounded-full border border-gray-200 bg-white px-2 py-0.5 shadow-sm transition-all duration-200 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-300 hover:shadow-md dark:border-gray-600 dark:bg-primary-foreground ${type === 'posts' ? 'mt-2 w-full md:max-w-md' : 'w-48 md:w-64'}`}
    >
      <Search size={18} className="text-gray-400 dark:text-gray-200" />
      <Input
        type="text"
        placeholder="Search a post..."
        onKeyDown={handleEnter}
        className="h-8 w-full border-none bg-transparent text-sm placeholder:text-gray-400 focus:outline-none focus-visible:ring-0 dark:placeholder:text-gray-200"
      />
    </div>
  );
};

export default Searchbar;

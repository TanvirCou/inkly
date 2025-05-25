import Categories from '@/components/home/Categories';
import FeaturedPost from '@/components/home/FeaturedPost';
import Posts from '@/components/posts/Posts';
import { getWebInfo } from '@/lib/api/fetch-info';
import { Info } from '@/lib/types/types';
import Link from 'next/link';
import React from 'react';

const HomePage = async () => {
  const info: Info = await getWebInfo();

  return (
    <div className="flex flex-col gap-3 px-4 py-4 sm:px-6 md:px-8 lg:px-16">
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-100 via-white to-purple-100 px-6 py-12 dark:from-indigo-950/20 dark:via-background dark:to-purple-950/20 sm:px-8 sm:py-16 md:px-12 lg:px-20">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center">
              <h1 className="animate-fade-up bg-gradient-to-br from-black to-indigo-800 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-white dark:to-indigo-400 sm:text-4xl lg:text-5xl">
                {info.title}
              </h1>
              <p className="mt-6 animate-fade-up text-lg leading-8 text-gray-600 animation-delay-200 dark:text-gray-300">
                {info.desc}
              </p>
              <div className="mt-8 animate-fade-up animation-delay-300">
                <Link
                  href="/create-post"
                  className="inline-flex items-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-indigo-500 hover:shadow-indigo-100 dark:hover:shadow-indigo-950"
                >
                  <span>Start Writing</span>
                  <svg
                    className="ml-2 h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.75 6.75L19.25 12L13.75 17.25"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19 12H4.75"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative h-[500px] w-full">
                {/* Floating Cards */}
                <div className="absolute right-0 top-0 animate-float animation-delay-200">
                  <div className="relative h-64 w-48 rounded-2xl bg-white p-4 shadow-xl dark:bg-gray-800 dark:shadow-gray-900/50">
                    <div className="h-32 w-full rounded-xl bg-indigo-100 dark:bg-indigo-900/30"></div>
                    <div className="mt-4 space-y-2">
                      <div className="h-4 w-3/4 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                      <div className="h-4 w-1/2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                  </div>
                </div>

                <div className="absolute right-32 top-20 animate-float animation-delay-400">
                  <div className="relative h-64 w-48 rounded-2xl bg-white p-4 shadow-xl dark:bg-gray-800 dark:shadow-gray-900/50">
                    <div className="flex h-32 w-full items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/30">
                      <svg
                        className="h-16 w-16 text-purple-500 dark:text-purple-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zM13 7h-2v6h6v-2h-4V7z" />
                      </svg>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="h-4 w-3/4 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                      <div className="h-4 w-1/2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -right-6 top-52 h-40 w-40 animate-float animation-delay-300">
                  <div className="relative h-full w-full rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-500 p-1 dark:from-indigo-400 dark:to-purple-400">
                    <div className="h-full w-full rounded-3xl bg-white p-4 dark:bg-gray-800">
                      <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-2">
                        <div className="rounded-lg bg-indigo-100 dark:bg-indigo-900/30"></div>
                        <div className="rounded-lg bg-purple-100 dark:bg-purple-900/30"></div>
                        <div className="rounded-lg bg-purple-100 dark:bg-purple-900/30"></div>
                        <div className="rounded-lg bg-indigo-100 dark:bg-indigo-900/30"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Shapes */}
                <div className="absolute -right-4 top-80 h-24 w-24 animate-float animation-delay-500">
                  <div className="h-full w-full rounded-full bg-yellow-200 bg-opacity-80 dark:bg-yellow-400/20"></div>
                </div>
                <div className="absolute right-48 top-72 h-16 w-16 animate-float animation-delay-200">
                  <div className="h-full w-full rounded-lg bg-indigo-200 bg-opacity-80 dark:bg-indigo-400/20"></div>
                </div>

                {/* Background Decoration */}
                <div className="absolute -right-20 top-20 -z-10 h-[600px] w-[600px] animate-blob opacity-30">
                  <div className="absolute h-full w-full rounded-full bg-purple-200 mix-blend-multiply blur-xl dark:bg-purple-900 dark:mix-blend-soft-light"></div>
                  <div className="absolute h-full w-full translate-x-4 translate-y-4 rounded-full bg-indigo-200 mix-blend-multiply blur-xl dark:bg-indigo-900 dark:mix-blend-soft-light"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Categories />

      <FeaturedPost />

      <Posts />
    </div>
  );
};

export default HomePage;

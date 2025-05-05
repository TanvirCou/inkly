import Categories from '@/components/home/Categories';
import FeaturedPost from '@/components/home/FeaturedPost';
import Posts from '@/components/posts/Posts';
import Link from 'next/link';
import React from 'react';

const HomePage = () => {
  return (
    <div className="flex flex-col gap-3 px-4 py-4 sm:px-6 md:px-8 lg:px-16">
      <div className="flex items-center justify-between">
        <div className="flex w-full flex-col gap-2 md:w-[70%] lg:w-[60%]">
          <p className="text-2xl font-bold md:text-4xl/[60px] lg:text-[52px]">
            Write Blogs. Read Stories. Stay Inspired.
          </p>
          <p className="lg:text-md text-sm">
            A modern platform to write, publish, and explore blogs. Share your
            voice, discover new perspectives, and stay inspired by stories from
            around the world.
          </p>
        </div>

        <div>
          <Link href="/create-post" className="hidden md:block">
            <div className="relative cursor-pointer md:mb-4">
              <svg
                viewBox="0 0 200 200"
                width="150"
                height="150"
                className="animateBtn animate-spin"
              >
                <circle cx="100" cy="100" r="90" fill="#4f46e5" />
                <path
                  id="innerCirclePath"
                  fill="none"
                  d="M 100,100 m -60,0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
                />
                <text className="text-lg tracking-wider">
                  <textPath href="#innerCirclePath" fill="white">
                    Write your story •
                  </textPath>
                </text>
                <text className="text-lg tracking-wider">
                  <textPath
                    href="#innerCirclePath"
                    fill="white"
                    startOffset="50%"
                  >
                    Share your idea •
                  </textPath>
                </text>
              </svg>
              <div className="absolute bottom-0 left-0 right-0 top-0 m-auto flex h-20 w-20 items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="50"
                  height="50"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  className="animateBtn animate-spin"
                >
                  <line x1="6" y1="18" x2="18" y2="6" />
                  <polyline points="9 6 18 6 18 15" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <Categories />

      <FeaturedPost />

      <Posts />
    </div>
  );
};

export default HomePage;

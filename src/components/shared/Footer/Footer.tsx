import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Github, Mail } from 'lucide-react';
import FooterLink from './FooterLink';
import SocialLink from './SocialLink';
import { getAllCategories } from '@/lib/api/fetch-categories';
import { Category } from '@/lib/types/types';
const Footer = async () => {
  const currentYear = new Date().getFullYear();
  const categories: Category[] = await getAllCategories();

  const firstFourCategories = categories.slice(0, 4);

  return (
    <footer className="relative overflow-hidden border-t border-indigo-100/50 bg-gradient-to-br from-white via-indigo-50/50 to-purple-50/50 px-4 backdrop-blur-sm dark:border-gray-800/50 dark:from-gray-900/80 dark:via-indigo-950/50 dark:to-purple-950/50 md:px-8 lg:px-16">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5"></div>
      <div className="container relative mx-auto px-4 py-12">
        {/* Top section with logo and navigation */}
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand and description */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link href="/" className="mb-4 inline-block">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-2xl font-bold text-transparent">
                Inkly
              </span>
            </Link>
            <p className="mb-4 max-w-md text-sm text-gray-600 dark:text-gray-300">
              A modern blogging platform focused on delivering high-quality
              content about technology, development, and digital trends.
            </p>
            <div className="flex space-x-4">
              <SocialLink
                href="https://twitter.com"
                icon={
                  <Twitter
                    size={16}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                }
              />
              <SocialLink
                href="https://facebook.com"
                icon={
                  <Facebook
                    size={16}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                }
              />
              <SocialLink
                href="https://instagram.com"
                icon={
                  <Instagram
                    size={16}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                }
              />
              <SocialLink
                href="https://github.com"
                icon={
                  <Github
                    size={16}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                }
              />
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text font-semibold text-transparent dark:from-white dark:to-gray-300">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/posts">Blog</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text font-semibold text-transparent dark:from-white dark:to-gray-300">
              Categories
            </h3>
            <ul className="space-y-2">
              {firstFourCategories.map((category) => (
                <FooterLink
                  key={category._id}
                  href={`/posts?cat=${category.value}`}
                >
                  {category.label}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text font-semibold text-transparent dark:from-white dark:to-gray-300">
              Newsletter
            </h3>
            <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">
              Subscribe to our newsletter to get the latest updates
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-l-md border border-indigo-100/50 bg-white/50 p-2 text-sm backdrop-blur-sm transition-all focus:border-indigo-300 focus:outline-none focus:ring-1 focus:ring-indigo-400 dark:border-gray-700/50 dark:bg-gray-900/50 dark:placeholder:text-gray-400"
              />
              <button className="rounded-r-md bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:from-indigo-500 hover:to-purple-500 hover:shadow-md dark:from-indigo-500 dark:to-purple-500">
                <Mail
                  size={16}
                  className="transition-transform duration-300 hover:scale-110"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-indigo-100/30 dark:border-gray-800/30"></div>

        {/* Bottom section with copyright and legal links */}
        <div className="flex flex-col items-center justify-between text-sm text-gray-500 dark:text-gray-400 md:flex-row">
          <p className="bg-gradient-to-r from-gray-600 to-gray-400 bg-clip-text text-transparent dark:from-gray-300 dark:to-gray-500">
            © {currentYear} Inkly. All rights reserved.
          </p>
          <div className="mt-4 flex space-x-6 md:mt-0">
            <FooterLink href="/privacy" small>
              Privacy Policy
            </FooterLink>
            <FooterLink href="/terms" small>
              Terms of Service
            </FooterLink>
            <FooterLink href="/cookies" small>
              Cookie Policy
            </FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

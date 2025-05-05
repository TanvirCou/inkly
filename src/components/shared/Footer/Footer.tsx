import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Github, Mail } from 'lucide-react';
import FooterLink from './FooterLink';
import SocialLink from './SocialLink';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="rounded-md border-t border-gray-100 bg-white dark:border-gray-800 dark:bg-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        {/* Top section with logo and navigation */}
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand and description */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link href="/" className="mb-4 inline-block">
              <span className="text-2xl font-bold text-indigo-600">Inkly</span>
            </Link>
            <p className="mb-4 max-w-md text-sm text-gray-600 dark:text-gray-300">
              A modern blogging platform focused on delivering high-quality
              content about technology, development, and digital trends.
            </p>
            <div className="flex space-x-4">
              <SocialLink
                href="https://twitter.com"
                icon={<Twitter size={16} />}
              />
              <SocialLink
                href="https://facebook.com"
                icon={<Facebook size={16} />}
              />
              <SocialLink
                href="https://instagram.com"
                icon={<Instagram size={16} />}
              />
              <SocialLink
                href="https://github.com"
                icon={<Github size={16} />}
              />
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-800 dark:text-white">
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
            <h3 className="mb-4 font-semibold text-gray-800 dark:text-white">
              Categories
            </h3>
            <ul className="space-y-2">
              <FooterLink href="/posts?cat=web-design">Web Design</FooterLink>
              <FooterLink href="/posts?cat=development">Development</FooterLink>
              <FooterLink href="/posts?cat=databases">Databases</FooterLink>
              <FooterLink href="/posts?cat=marketing">Marketing</FooterLink>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-800 dark:text-white">
              Newsletter
            </h3>
            <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">
              Subscribe to our newsletter to get the latest updates
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-l-md border border-gray-200 bg-gray-50 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-400 dark:border-gray-700 dark:bg-gray-800 dark:placeholder:text-gray-300"
              />
              <button className="rounded-r-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-indigo-700">
                <Mail size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-100"></div>

        {/* Bottom section with copyright and legal links */}
        <div className="flex flex-col items-center justify-between text-sm text-gray-500 dark:text-gray-300 md:flex-row">
          <p>© {currentYear} Inkly. All rights reserved.</p>
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

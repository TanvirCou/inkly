import Link from 'next/link';
import React from 'react';

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  small?: boolean;
}

const FooterLink = ({ href, children, small = false }: FooterLinkProps) => {
  return (
    <li className={`list-none ${small ? '' : 'first-letter:uppercase'}`}>
      <Link
        href={href}
        className={`group relative inline-block text-gray-600 transition-colors duration-300 dark:text-gray-400 ${
          small ? 'text-xs' : 'text-sm'
        }`}
      >
        <span className="relative">
          <span className="relative z-10 transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
            {children}
          </span>
          <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 group-hover:w-full dark:from-indigo-400 dark:to-purple-400"></span>
        </span>
      </Link>
    </li>
  );
};

export default FooterLink;

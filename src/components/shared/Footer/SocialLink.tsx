import Link from 'next/link';
import React from 'react';

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
}

const SocialLink = ({ href, icon }: SocialLinkProps) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-indigo-50 to-purple-50 text-gray-600 shadow-sm transition-all duration-300 hover:shadow-md dark:from-gray-800 dark:to-gray-700 dark:text-gray-300"
    >
      <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
      <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
        {icon}
      </span>
    </Link>
  );
};

export default SocialLink;

import Link from 'next/link';

const FooterLink = ({
  href,
  children,
  small = false,
}: {
  href: string;
  children: React.ReactNode;
  small?: boolean;
}) => {
  return (
    <li>
      <Link
        href={href}
        className={`text-gray-600 transition-colors duration-300 hover:text-indigo-600 dark:text-gray-300 ${
          small ? '' : 'text-sm'
        }`}
      >
        {children}
      </Link>
    </li>
  );
};

export default FooterLink;

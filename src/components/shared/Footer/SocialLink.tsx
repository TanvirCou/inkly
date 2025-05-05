const SocialLink = ({
  href,
  icon,
}: {
  href: string;
  icon: React.ReactNode;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors duration-300 hover:bg-indigo-100 hover:text-indigo-600 dark:bg-gray-800 dark:text-gray-300"
    >
      {icon}
    </a>
  );
};

export default SocialLink;

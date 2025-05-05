import MainNavbar from '@/components/shared/Navbar/MainNavbar';
import React from 'react';

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <MainNavbar />
      {children}
    </div>
  );
};

export default layout;

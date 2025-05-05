import Footer from '@/components/shared/Footer/Footer';
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
      <Footer />
    </div>
  );
};

export default layout;

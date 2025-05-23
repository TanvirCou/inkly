import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theming/theme-provider';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';
import { ourFileRouter } from '@/app/api/uploadthing/core';
import { ClerkLoaded, ClerkLoading, ClerkProvider } from '@clerk/nextjs';
import { Toaster } from '@/components/ui/toaster';
import Loading from './loading';

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Inkly | Your Source for Inspiring Blogs',
  description:
    'Discover thought-provoking and inspiring blog posts on Inkly. Explore topics that matter, written by passionate voices.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${roboto.className} antialiased`}>
          <div>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <ClerkLoading>
                <div className="flex h-screen items-center justify-center">
                  <Loading />
                </div>
              </ClerkLoading>
              <ClerkLoaded>
                <NextSSRPlugin
                  routerConfig={extractRouterConfig(ourFileRouter)}
                />
                {children}
                <Toaster />
              </ClerkLoaded>
            </ThemeProvider>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}

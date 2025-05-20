'use client';
import { SignIn } from '@clerk/nextjs';
import { useTheme } from 'next-themes';
import { dark } from '@clerk/themes';

export default function Page() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex w-full items-center justify-center p-8">
      <SignIn
        afterSignInUrl="/"
        appearance={{
          baseTheme: resolvedTheme === 'dark' ? dark : undefined,
        }}
      />
    </div>
  );
}

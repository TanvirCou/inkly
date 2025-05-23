'use client';
import { SignUp } from '@clerk/nextjs';
import { useTheme } from 'next-themes';
import { dark } from '@clerk/themes';

const Register = () => {
  const { resolvedTheme } = useTheme();
  return (
    <div className="flex w-full items-center justify-center p-8">
      <SignUp
        afterSignUpUrl="/"
        appearance={{
          baseTheme: resolvedTheme === 'dark' ? dark : undefined,
        }}
      />
    </div>
  );
};

export default Register;

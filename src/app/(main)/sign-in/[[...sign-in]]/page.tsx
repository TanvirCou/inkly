import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex w-full items-center justify-center p-8">
      <SignIn afterSignInUrl="/" />
    </div>
  );
}

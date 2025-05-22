export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="space-y-4 text-center">
        <div className="relative">
          {/* Animated circles */}
          <div className="flex justify-center gap-3">
            <div className="h-3 w-3 animate-[bounce_0.9s_ease-in-out_infinite_0ms] rounded-full bg-indigo-600"></div>
            <div className="h-3 w-3 animate-[bounce_0.9s_ease-in-out_infinite_150ms] rounded-full bg-indigo-600"></div>
            <div className="h-3 w-3 animate-[bounce_0.9s_ease-in-out_infinite_300ms] rounded-full bg-indigo-600"></div>
          </div>
        </div>
        <h2 className="mt-4 text-xl font-medium text-gray-700 dark:text-gray-200">
          Loading
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          Please wait while we prepare your content...
        </p>
      </div>
    </div>
  );
}

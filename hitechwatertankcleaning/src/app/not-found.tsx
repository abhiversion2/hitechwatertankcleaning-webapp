// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <h1 className="text-6xl font-bold text-blue-700 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Page Not Found</h2>
      <p className="text-lg text-gray-600 mb-8 max-w-md">
        The page you're looking for doesn't exist. You might have mistyped the address or the page may have moved.
      </p>
      <Link
        href="/"
        className="bg-blue-700 text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-blue-800 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
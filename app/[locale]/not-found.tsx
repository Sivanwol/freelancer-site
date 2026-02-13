import Link from 'next/link';

export default function LocaleNotFound() {
  return (
    <div className="min-h-screen bg-[#111827] flex items-center justify-center p-4">
      <div className="text-center">
        <div className="text-[96px] font-extrabold opacity-10 mb-4 select-none">404</div>
        <h1 className="text-2xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/he"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
          >
            חזרה לדף הבית
          </Link>
          <Link
            href="/en"
            className="px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:border-gray-500 transition-colors text-sm"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

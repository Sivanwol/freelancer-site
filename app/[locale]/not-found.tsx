import Link from 'next/link';

export default function LocaleNotFound() {
  return (
    <div className="min-h-screen bg-[#07111f] flex items-center justify-center p-4">
      <div className="text-center">
        <div className="text-[96px] font-extrabold opacity-10 mb-4 select-none">404</div>
        <h1 className="text-2xl font-bold text-white mb-4">Page Not Found / הדף לא נמצא</h1>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          <br />
          הדף שחיפשת לא קיים.
        </p>
        <Link
          href="/he"
          className="px-6 py-3 bg-sky-300 text-slate-950 rounded-[6px] hover:bg-white transition-colors text-sm font-semibold"
        >
          חזרה לדף הבית
        </Link>
      </div>
    </div>
  );
}

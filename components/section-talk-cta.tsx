import { Link } from '@/i18n/routing';
import { sitePaths } from '@/lib/site-paths';

type SectionTalkCtaProps = {
  label: string;
  className?: string;
};

export function SectionTalkCta({ label, className = '' }: SectionTalkCtaProps) {
  return (
    <div className={`mt-12 text-center ${className}`}>
      <Link href={sitePaths.contact} className="btn-primary px-10 py-4">
        {label}
      </Link>
    </div>
  );
}

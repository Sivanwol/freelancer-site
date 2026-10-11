import Image from 'next/image';

type SiteLogoProps = {
  locale: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export function SiteLogo({ locale, alt, className = '', priority = false }: SiteLogoProps) {
  const isHebrew = locale === 'he';
  const src = isHebrew ? '/logo-he-trim.png' : '/logo-trim.png';

  return (
    <span className={`relative inline-flex h-11 w-[8.75rem] shrink-0 items-center ${className}`}>
      <Image
        key={src}
        src={src}
        alt={alt}
        width={280}
        height={80}
        priority={priority}
        className="h-full w-full object-contain object-center"
      />
    </span>
  );
}

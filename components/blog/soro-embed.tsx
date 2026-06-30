'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from '@/i18n/routing';

const SORO_EMBED_SRC = 'https://app.trysoro.com/api/embed/cba1e92c-70c0-4f06-9f93-6fc454e7a2d0';
const SORO_SCRIPT_ID = 'soro-blog-embed-script';

export default function SoroEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';
    document.getElementById(SORO_SCRIPT_ID)?.remove();

    const script = document.createElement('script');
    script.id = SORO_SCRIPT_ID;
    script.src = SORO_EMBED_SRC;
    script.defer = true;

    container.insertAdjacentElement('afterend', script);

    return () => {
      script.remove();
      container.innerHTML = '';
    };
  }, [pathname]);

  return <div id="soro-blog" ref={containerRef} />;
}

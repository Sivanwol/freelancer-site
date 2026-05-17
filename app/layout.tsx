import type { Metadata } from 'next';
import { getBaseUrl } from '@/lib/config';

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

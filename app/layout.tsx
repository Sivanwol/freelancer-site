// Root layout - redirects are handled by middleware to locale-specific routes
// This file exists for Next.js compatibility

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}



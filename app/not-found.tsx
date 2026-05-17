import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="he" dir="rtl">
      <body style={{ backgroundColor: '#07111f', color: '#f3f7fb', margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '96px', fontWeight: 800, opacity: 0.1, marginBottom: '16px' }}>404</div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>
              Page Not Found / הדף לא נמצא
            </h1>
            <p style={{ color: '#9ca3af', marginBottom: '32px' }}>
              The page you are looking for does not exist.
              <br />
              הדף שחיפשת לא קיים.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <Link
                href="/he"
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#7dd3fc',
                  color: '#07111f',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '14px',
                }}
              >
                חזרה לדף הבית
              </Link>
              <Link
                href="/en"
                style={{
                  padding: '12px 24px',
                  border: '1px solid #284665',
                  color: '#d1d5db',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '14px',
                }}
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

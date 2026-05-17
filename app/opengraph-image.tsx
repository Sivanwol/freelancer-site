import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'DevCo Solutions - Software and automation systems built to scale';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '72px',
          color: '#f3f7fb',
          background: 'linear-gradient(135deg, #050c16 0%, #07111f 48%, #0d273d 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', color: '#75b7ff', fontSize: 30, fontWeight: 700, letterSpacing: 4 }}>
          DEVCO SOLUTIONS
        </div>
        <div style={{ display: 'flex', marginTop: 28, maxWidth: 900, fontSize: 70, lineHeight: 1.05, fontWeight: 800 }}>
          Software and automation systems built to scale
        </div>
        <div style={{ display: 'flex', marginTop: 28, maxWidth: 820, color: '#b8c6d8', fontSize: 28, lineHeight: 1.35 }}>
          Custom software, AI products, CRM automation, integrations, and business workflows.
        </div>
        <div style={{ display: 'flex', gap: 14, marginTop: 42 }}>
          {['Software Development', 'Business Automation', 'AI Systems'].map((item) => (
            <div
              key={item}
              style={{
                display: 'flex',
                padding: '12px 18px',
                border: '1px solid rgba(117, 183, 255, 0.32)',
                borderRadius: 8,
                color: '#d8ecff',
                fontSize: 20,
                background: 'rgba(255,255,255,0.06)',
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}

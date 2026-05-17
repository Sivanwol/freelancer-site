import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'DevCo Solutions - Custom software development and business automation';
export const size = { width: 1200, height: 628 };
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
          background: 'linear-gradient(135deg, #050c16 0%, #07111f 52%, #0d273d 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', color: '#75b7ff', fontSize: 30, fontWeight: 700, letterSpacing: 4 }}>
          DEVCO SOLUTIONS
        </div>
        <div style={{ display: 'flex', marginTop: 28, maxWidth: 900, fontSize: 68, lineHeight: 1.05, fontWeight: 800 }}>
          Custom software development and business automation
        </div>
        <div style={{ display: 'flex', marginTop: 32, color: '#b8c6d8', fontSize: 26 }}>
          React · Node.js · Python · AI · n8n · Make · Zapier · HubSpot
        </div>
      </div>
    ),
    { ...size }
  );
}

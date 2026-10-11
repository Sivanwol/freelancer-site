import { ImageResponse } from 'next/og';

export const alt = 'DevCo Solutions — repair live RAG chat in SaaS products';
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
          color: '#f5efe6',
          background: 'linear-gradient(135deg, #0c0e14 0%, #141820 48%, #1a1f2a 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', color: '#e8b56a', fontSize: 30, fontWeight: 700, letterSpacing: 4 }}>
          DEVCO SOLUTIONS
        </div>
        <div style={{ display: 'flex', marginTop: 28, maxWidth: 980, fontSize: 58, lineHeight: 1.05, fontWeight: 800 }}>
          Fix live RAG chat in SaaS products
        </div>
        <div style={{ display: 'flex', marginTop: 28, maxWidth: 860, color: '#c8bdb0', fontSize: 28, lineHeight: 1.35 }}>
          Wrong answers, missing citations, ACL leaks, and no eval gates — repaired in your codebase, not slideware.
        </div>
        <div style={{ display: 'flex', gap: 14, marginTop: 42 }}>
          {['RAG repair', 'Citations', 'ACL + evals'].map((item) => (
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

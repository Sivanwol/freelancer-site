import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Sivan Wolberg - Full Stack & AI Developer';
export const size = { width: 1200, height: 628 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #111827 0%, #1e1b4b 50%, #111827 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: '64px',
              fontWeight: 800,
              background: 'linear-gradient(90deg, #c084fc, #f472b6)',
              backgroundClip: 'text',
              color: 'transparent',
              display: 'flex',
            }}
          >
            Sivan Wolberg
          </div>

          <div
            style={{
              fontSize: '32px',
              color: '#e5e7eb',
              fontWeight: 400,
              display: 'flex',
            }}
          >
            Full Stack & AI Developer
          </div>

          <div
            style={{
              width: '120px',
              height: '3px',
              background: 'linear-gradient(90deg, #8b5cf6, #ec4899)',
              borderRadius: '4px',
              margin: '8px 0',
              display: 'flex',
            }}
          />

          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            {['React', 'Node.js', 'Python', 'AI / LangChain', 'Next.js'].map(
              (tech) => (
                <div
                  key={tech}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '24px',
                    border: '1px solid rgba(139, 92, 246, 0.4)',
                    color: '#c4b5fd',
                    fontSize: '18px',
                    background: 'rgba(139, 92, 246, 0.1)',
                    display: 'flex',
                  }}
                >
                  {tech}
                </div>
              )
            )}
          </div>

          <div
            style={{
              fontSize: '20px',
              color: '#9ca3af',
              marginTop: '16px',
              display: 'flex',
            }}
          >
            15+ Years Experience · Top Rated Plus on Upwork
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

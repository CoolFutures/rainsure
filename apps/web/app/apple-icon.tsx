import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#020617',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '40px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
          {/* Cloud */}
          <div style={{ position: 'relative', width: '110px', height: '60px' }}>
            {/* Main cloud body */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '45px',
              background: '#06b6d4',
              borderRadius: '22px',
            }} />
            {/* Left bump */}
            <div style={{
              position: 'absolute',
              width: '48px',
              height: '48px',
              background: '#06b6d4',
              borderRadius: '50%',
              bottom: '22px',
              left: '10px',
            }} />
            {/* Right bump (larger) */}
            <div style={{
              position: 'absolute',
              width: '58px',
              height: '58px',
              background: '#06b6d4',
              borderRadius: '50%',
              bottom: '20px',
              right: '10px',
            }} />
          </div>

          {/* Rain drops */}
          <div style={{ display: 'flex', gap: '14px' }}>
            {[0.9, 0.6, 1, 0.7, 0.9].map((opacity, i) => (
              <div key={i} style={{
                width: '6px',
                height: '22px',
                background: '#22d3ee',
                borderRadius: '3px',
                opacity,
              }} />
            ))}
          </div>

          {/* Brand name */}
          <div style={{
            color: '#06b6d4',
            fontSize: '20px',
            fontWeight: 900,
            letterSpacing: '0.2em',
            fontFamily: 'sans-serif',
          }}>
            RAINSURE
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

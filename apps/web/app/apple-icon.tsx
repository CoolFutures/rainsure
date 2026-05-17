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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          {/* Cloud shape using flex only */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Top bumps */}
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <div style={{ width: '42px', height: '42px', background: '#06b6d4', borderRadius: '50%' }} />
              <div style={{ width: '58px', height: '58px', background: '#06b6d4', borderRadius: '50%', marginLeft: '-14px' }} />
              <div style={{ width: '38px', height: '38px', background: '#06b6d4', borderRadius: '50%', marginLeft: '-10px' }} />
            </div>
            {/* Cloud base */}
            <div style={{
              display: 'flex',
              width: '110px',
              height: '38px',
              background: '#06b6d4',
              borderRadius: '6px 6px 18px 18px',
              marginTop: '-22px',
            }} />
          </div>

          {/* Rain drops */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
            <div style={{ display: 'flex', width: '7px', height: '24px', background: '#22d3ee', borderRadius: '4px' }} />
            <div style={{ display: 'flex', width: '7px', height: '18px', background: '#22d3ee', borderRadius: '4px', opacity: 0.7 }} />
            <div style={{ display: 'flex', width: '7px', height: '24px', background: '#22d3ee', borderRadius: '4px' }} />
            <div style={{ display: 'flex', width: '7px', height: '18px', background: '#22d3ee', borderRadius: '4px', opacity: 0.7 }} />
            <div style={{ display: 'flex', width: '7px', height: '24px', background: '#22d3ee', borderRadius: '4px' }} />
          </div>

          {/* Brand text */}
          <div style={{
            display: 'flex',
            color: '#06b6d4',
            fontSize: '22px',
            fontWeight: 900,
            letterSpacing: '0.18em',
            fontFamily: 'sans-serif',
            marginTop: '4px',
          }}>
            RAINSURE
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

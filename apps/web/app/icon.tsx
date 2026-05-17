import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
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
          borderRadius: '7px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
          {/* Cloud body */}
          <div style={{
            display: 'flex',
            position: 'relative',
            alignItems: 'flex-end',
          }}>
            {/* Main cloud shape using stacked rounded divs */}
            <div style={{
              width: '20px',
              height: '10px',
              background: '#06b6d4',
              borderRadius: '10px 10px 4px 4px',
              position: 'relative',
            }}>
              {/* Left bump */}
              <div style={{
                position: 'absolute',
                width: '9px',
                height: '9px',
                background: '#06b6d4',
                borderRadius: '50%',
                top: '-5px',
                left: '2px',
              }} />
              {/* Right bump */}
              <div style={{
                position: 'absolute',
                width: '11px',
                height: '11px',
                background: '#06b6d4',
                borderRadius: '50%',
                top: '-7px',
                right: '2px',
              }} />
            </div>
          </div>

          {/* Rain drops */}
          <div style={{ display: 'flex', gap: '4px', marginTop: '1px' }}>
            <div style={{ width: '2px', height: '5px', background: '#22d3ee', borderRadius: '1px', opacity: 0.9 }} />
            <div style={{ width: '2px', height: '5px', background: '#22d3ee', borderRadius: '1px', opacity: 0.7 }} />
            <div style={{ width: '2px', height: '5px', background: '#22d3ee', borderRadius: '1px', opacity: 0.9 }} />
            <div style={{ width: '2px', height: '5px', background: '#22d3ee', borderRadius: '1px', opacity: 0.6 }} />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

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
          {/* Cloud: top bumps row */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0px' }}>
            <div style={{ width: '8px', height: '8px', background: '#06b6d4', borderRadius: '50%' }} />
            <div style={{ width: '11px', height: '11px', background: '#06b6d4', borderRadius: '50%', marginLeft: '-3px' }} />
          </div>
          {/* Cloud base */}
          <div style={{ display: 'flex', width: '20px', height: '7px', background: '#06b6d4', borderRadius: '4px', marginTop: '-6px' }} />
          {/* Rain drops row */}
          <div style={{ display: 'flex', gap: '3px', marginTop: '2px' }}>
            <div style={{ width: '2px', height: '5px', background: '#22d3ee', borderRadius: '1px' }} />
            <div style={{ width: '2px', height: '5px', background: '#22d3ee', borderRadius: '1px', opacity: 0.7 }} />
            <div style={{ width: '2px', height: '5px', background: '#22d3ee', borderRadius: '1px' }} />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

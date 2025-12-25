import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'DocBuilder';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#09090b',
          position: 'relative',
        }}
      >
        {/* 微細なノイズテクスチャ風のグラデーション */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 60%)',
          }}
        />

        {/* ロゴ */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}
        >
          {/* アイコン */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '120px',
              height: '120px',
              borderRadius: '28px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
              boxShadow: '0 0 80px rgba(139, 92, 246, 0.4)',
            }}
          >
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <path d="m10 13-2 2 2 2" />
              <path d="m14 17 2-2-2-2" />
            </svg>
          </div>

          {/* タイトル */}
          <span
            style={{
              fontSize: '80px',
              fontWeight: 700,
              color: '#fafafa',
              letterSpacing: '-3px',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            DocBuilder
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

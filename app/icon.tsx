import { ImageResponse } from 'next/server';

// Next의 런타임 참고
// https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes#edge-runtime
// 정리
// - nodejs: 모든 Node.js API 및 이에 의존하는 패키지에 접근 가능하지만 edge보다 느림
// - edge: Node.js API의 하위집합으로 최소한의 리소스로 빠르지만 제약이 많아 작고 간단한 기능에 적합함
export const runtime = 'edge'; // [edge, nodejs]

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Favicon

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 24,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        👻
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    }
  );
}

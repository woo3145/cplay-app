import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { getServerSession } from 'next-auth';
import SessionProvider from './_components/SessionProvider';
import { authOptions } from './api/auth/[...nextauth]/route';

// Next의 런타임 참고
// https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes#edge-runtime
// 정리
// 런타임은 개별 경로별로 런타임을 지정할 수 있음
// - nodejs: 모든 Node.js API 및 이에 의존하는 패키지에 접근 가능하지만 edge보다 느림
// - edge: Node.js API의 하위집합으로 최소한의 리소스로 빠르지만 제약이 많아 작고 간단한 기능에 적합함
// **패키지를 거의 사용하는게 아니라면 nodejs 사용**
export const runtime = 'nodejs'; // [edge, nodejs]

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CanPlay',
  description:
    'CanPlay is a platform for musicians to perform and share their improvisations',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}

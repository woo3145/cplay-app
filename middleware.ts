import { Role } from '@prisma/client';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    if (req.nextauth.token?.role !== Role.ADMIN) {
      return NextResponse.redirect(new URL('/', process.env.NEXTAUTH_URL));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ['/admin/:path*'],
};

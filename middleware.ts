import 'server-only'
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (token) {
  }

  // Protect admin routes
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!token) return NextResponse.redirect(new URL('/login', req.url));

    try {
        const { payload } = await jwtVerify(token, SECRET);
          return NextResponse.next();
      } catch (err) {
        return NextResponse.redirect(new URL('/login', req.url));
      }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

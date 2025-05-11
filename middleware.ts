import 'server-only'
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (token) {
    console.log("big bag w one cookie in it")
  }

  // Protect admin routes
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!token) return NextResponse.redirect(new URL('/login', req.url));

    try {
        const { payload } = await jwtVerify(token, SECRET);
        console.log("User authenticated")
          return NextResponse.next();
      } catch (err) {
        console.log("Invalid token", err)
        return NextResponse.redirect(new URL('/login', req.url));
      }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

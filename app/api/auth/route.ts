import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email }});
    if (!user) {
        return NextResponse.json({ error: "Invalid credentials "}, { status: 401 })
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return NextResponse.json({ error: "Invalid credentials "}, { status: 401 })
    }

    const token = await new SignJWT({
        userID: user.id,
        email: user.email,
    }).setProtectedHeader({ alg: 'HS256' }).setExpirationTime('7d').sign(SECRET)
    
    console.log("Successfully Authenticated")
    console.log("Token: " + token)
    const res = NextResponse.json({ success: true })
    res.cookies.set('token', token, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 * 7 })
    return res;
}
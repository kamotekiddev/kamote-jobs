import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

import client from '@/lib/prismadb';
import getErrorMessage from '@/lib/getErrorMessage';

export async function POST(req: NextRequest) {
    try {
        const { email, password, name } = await req.json();

        if (!email || !password || !name)
            return NextResponse.json(
                { message: 'Invalid Data' },
                { status: 400 }
            );

        const existingUser = await client.user.findFirst({ where: { email } });
        if (existingUser)
            return NextResponse.json(
                { message: 'Email is already been taken.' },
                { status: 400 }
            );

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await client.user.create({
            data: { name, email, hashedPassword },
        });

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json(
            { message: getErrorMessage(error), error },
            { status: 500 }
        );
    }
}

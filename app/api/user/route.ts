import { NextRequest, NextResponse } from 'next/server';

import getErrorMessage from '@/lib/getErrorMessage';
import getCurrentUser from '@/actions/getCurrentUser';
import client from '@/lib/prismadb';

export async function POST(req: NextRequest) {
    try {
        const { role } = await req.json();
        const user = await getCurrentUser();

        if (!user)
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );

        if (!role)
            return NextResponse.json(
                { message: 'Invalid Data' },
                { status: 400 }
            );

        const updatedUser = await client.user.update({
            where: { id: user.id },
            data: { role },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        return NextResponse.json(
            { message: getErrorMessage(error), error },
            { status: 500 }
        );
    }
}

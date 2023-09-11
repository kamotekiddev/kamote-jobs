import { NextRequest, NextResponse } from 'next/server';
import getCurrentUser from '@/actions/getCurrentUser';
import getErrorMessage from '@/lib/getErrorMessage';
import client from '@/lib/prismadb';

export async function GET(req: NextRequest) {
    try {
        const hiringStatus = req.nextUrl.searchParams.get('hiring_status');
        const user = await getCurrentUser();
        if (!user?.id)
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );

        const savedPosts = await client.jobPost.findMany({
            where: {
                ...(hiringStatus !== 'all' && {
                    isHiring: hiringStatus === 'hiring',
                }),
                savedByUserIds: { hasSome: [user.id] },
            },
            include: {
                user: true,
                savedByUsers: true,
            },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(savedPosts);
    } catch (error) {
        return NextResponse.json(
            { message: getErrorMessage(error), error },
            { status: 500 }
        );
    }
}

import { NextRequest, NextResponse } from 'next/server';
import getCurrentUser from '@/actions/getCurrentUser';
import getErrorMessage from '@/lib/getErrorMessage';
import client from '@/lib/prismadb';

export async function GET(req: NextRequest) {
    try {
        const user = await getCurrentUser();
        if (!user?.id)
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );

        const savedPosts = await client.jobPost.findMany({
            where: {
                savedByUserIds: { hasSome: [user.id] },
            },
            include: {
                applications: true,
                user: true,
                employmentType: true,
                jobTitle: true,
                savedByUsers: true,
                workplaceType: true,
            },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(savedPosts);
    } catch (error) {
        return NextResponse.json({ message: getErrorMessage(error), error });
    }
}

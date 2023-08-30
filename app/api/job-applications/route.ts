import { NextRequest, NextResponse } from 'next/server';
import getCurrentUser from '@/actions/getCurrentUser';
import getErrorMessage from '@/lib/getErrorMessage';
import client from '@/lib/prismadb';

export async function GET(req: NextRequest) {
    try {
        const user = await getCurrentUser();
        if (!user)
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );

        const jobApplications = await client.jobApplication.findMany({
            where: { userId: user.id },
            include: { jobPost: { include: { jobTitle: true } } },
        });

        return NextResponse.json(jobApplications);
    } catch (error) {
        return NextResponse.json(
            { message: getErrorMessage(error), error },
            { status: 500 }
        );
    }
}

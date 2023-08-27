import { NextRequest, NextResponse } from 'next/server';

import getCurrentUser from '@/actions/getCurrentUser';
import getErrorMessage from '@/lib/getErrorMessage';
import client from '@/lib/prismadb';

type Params = {
    params: { jobId: string };
};
export async function GET(req: NextRequest, { params }: Params) {
    try {
        const user = await getCurrentUser();
        if (!user)
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );

        const jobPost = await client.jobPost.findUnique({
            where: { id: params.jobId },
            include: {
                user: true,
                applications: {
                    select: {
                        user: true,
                        caption: true,
                        contactNo: true,
                        email: true,
                        createdAt: true,
                        id: true,
                        resumeLink: true,
                        updatedAt: true,
                        userId: true,
                        jobPostId: true,
                    },
                },
                employmentType: true,
                jobTitle: true,
                savedByUsers: true,
                workplaceType: true,
            },
        });
        return NextResponse.json(jobPost);
    } catch (error) {
        return NextResponse.json(
            { message: getErrorMessage(error), error },
            { status: 500 }
        );
    }
}

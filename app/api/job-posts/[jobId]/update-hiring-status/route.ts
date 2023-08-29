import { NextRequest, NextResponse } from 'next/server';
import getCurrentUser from '@/actions/getCurrentUser';
import client from '@/lib/prismadb';
import getErrorMessage from '@/lib/getErrorMessage';

type Params = {
    params: { jobId: string };
};

export async function PUT(req: NextRequest, { params }: Params) {
    try {
        const user = await getCurrentUser();
        if (!user)
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );

        const jobPost = await client.jobPost.update({
            where: { id: params.jobId },
            data: { isHiring: false },
        });

        if (jobPost.id) {
            await client.jobApplication.updateMany({
                where: { status: 'applied', jobPostId: params.jobId },
                data: { status: 'rejected' },
            });
        }
        return NextResponse.json(jobPost);
    } catch (error) {
        return NextResponse.json(
            { message: getErrorMessage(error), error },
            { status: 500 }
        );
    }
}

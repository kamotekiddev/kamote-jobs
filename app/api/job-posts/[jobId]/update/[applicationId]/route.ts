import { NextRequest, NextResponse } from 'next/server';
import getCurrentUser from '@/actions/getCurrentUser';
import client from '@/lib/prismadb';
import getErrorMessage from '@/lib/getErrorMessage';

type Params = {
    params: { jobId: string; applicationId: string };
};

export async function PUT(req: NextRequest, { params }: Params) {
    try {
        const { status } = await req.json();
        const user = await getCurrentUser();

        if (!user)
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );

        if (!params.applicationId || !params.jobId)
            return NextResponse.json(
                { message: 'Invalid Data' },
                { status: 400 }
            );

        const updatedApplication = await client.jobApplication.update({
            where: { id: params.applicationId, jobPostId: params.jobId },
            data: { status },
        });

        return NextResponse.json(updatedApplication);
    } catch (error) {
        return NextResponse.json(
            { message: getErrorMessage(error), error },
            { status: 500 }
        );
    }
}

import { NextRequest, NextResponse } from 'next/server';
import getCurrentUser from '@/actions/getCurrentUser';
import client from '@/lib/prismadb';
import getErrorMessage from '@/lib/getErrorMessage';

type Params = {
    params: { jobId: string; applicationId: string };
};

export async function DELETE(req: NextRequest, { params }: Params) {
    try {
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

        const deletedApplication = await client.jobApplication.delete({
            where: { id: params.applicationId, jobPostId: params.jobId },
        });

        return NextResponse.json(deletedApplication);
    } catch (error) {
        return NextResponse.json({ message: getErrorMessage(error), error });
    }
}

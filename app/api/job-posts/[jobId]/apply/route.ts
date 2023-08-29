import { NextRequest, NextResponse } from 'next/server';
import getCurrentUser from '@/actions/getCurrentUser';
import client from '@/lib/prismadb';
import getErrorMessage from '@/lib/getErrorMessage';

type Params = {
    params: { jobId: string };
};

export async function POST(req: NextRequest, { params }: Params) {
    try {
        const user = await getCurrentUser();
        const { caption, contactNo, email, resumeLink } = await req.json();

        if (!user)
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );

        if (!contactNo || !email || !params.jobId)
            return NextResponse.json(
                { message: 'Invalid Data' },
                { status: 400 }
            );

        const existingApplication = await client.jobApplication.findFirst({
            where: { jobPostId: params.jobId, userId: user.id },
        });

        if (existingApplication)
            return NextResponse.json(
                { message: 'Already sent and application' },
                { status: 400 }
            );

        const application = await client.jobApplication.create({
            data: {
                jobPostId: params.jobId,
                contactNo,
                email,
                resumeLink,
                caption,
                userId: user.id,
            },
        });

        return NextResponse.json(application);
    } catch (error) {
        return NextResponse.json(
            { message: getErrorMessage(error), error },
            { status: 500 }
        );
    }
}

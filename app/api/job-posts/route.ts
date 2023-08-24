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
        const jobPosts = await client.jobPost.findMany({
            where: { NOT: { userId: { equals: user.id } } },
            include: {
                applications: true,
                user: true,
                employmentType: true,
                jobTitle: true,
                savedByUsers: true,
                workplaceType: true,
            },
        });
        return NextResponse.json(jobPosts);
    } catch (error) {
        return NextResponse.json({ message: getErrorMessage(error), error });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { action, postId } = await req.json();
        const user = await getCurrentUser();

        if (!action || !postId)
            return NextResponse.json(
                { message: 'Invalid Data' },
                { status: 400 }
            );

        if (!user?.id)
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );

        const existingJobPost = await client.jobPost.findUnique({
            where: { id: postId },
        });

        if (!existingJobPost)
            return NextResponse.json(
                { message: 'Post Id does not exist' },
                { status: 400 }
            );

        if (action === 'save') {
            const savedJobPost = await client.jobPost.update({
                where: { id: postId },
                data: {
                    savedByUserIds: [user.id],
                    savedByUsers: { connect: [{ id: user.id }] },
                },
            });

            return NextResponse.json(savedJobPost);
        }

        const unSavedJobPosts = await client.jobPost.update({
            where: { id: postId },
            data: {
                savedByUserIds: existingJobPost.savedByUserIds.filter(
                    (uid) => uid !== user.id
                ),
                savedByUsers: { disconnect: [{ id: user.id }] },
            },
        });

        return NextResponse.json(unSavedJobPosts);
    } catch (error) {
        return NextResponse.json({ message: getErrorMessage(error), error });
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const user = await getCurrentUser();
        if (!user?.id)
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );

        let jobTitle = await client.jobTitle.findFirst({
            where: { name: data.jobTitle },
        });

        if (!jobTitle)
            jobTitle = await client.jobTitle.create({
                data: { name: data.jobTitle },
            });

        const newJobPost = await client.jobPost.create({
            data: {
                companyName: data.companyName,
                location: data.location,
                employmentTypeId: data.employmentTypeId,
                workplaceTypeId: data.workplaceTypeId,
                jobTitleId: jobTitle?.id!,
                userId: user.id,
            },

            include: {
                employmentType: true,
                workplaceType: true,
                jobTitle: true,
                user: true,
                applications: true,
            },
        });

        return NextResponse.json(newJobPost);
    } catch (error) {
        return NextResponse.json({ message: getErrorMessage(error), error });
    }
}

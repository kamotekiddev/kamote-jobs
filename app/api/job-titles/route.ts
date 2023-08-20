import { NextRequest, NextResponse } from 'next/server';

import getCurrentUser from '@/actions/getCurrentUser';
import getErrorMessage from '@/lib/getErrorMessage';
import client from '@/lib/prismadb';

export async function GET(req: NextRequest) {
    try {
        const currentUser = await getCurrentUser();
        const searchQuery = req.nextUrl.searchParams.get('search_query');
        if (!currentUser?.id)
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );

        const jobTitles = await client.jobTitle.findMany({
            where: {
                name: { contains: searchQuery || '', mode: 'insensitive' },
            },
        });
        return NextResponse.json(jobTitles);
    } catch (error) {
        return NextResponse.json(
            { message: getErrorMessage(error) },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const { name } = await req.json();
        const currentUser = await getCurrentUser();

        if (!currentUser?.id)
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );

        if (!name)
            return NextResponse.json(
                { message: 'Invalid Data' },
                { status: 400 }
            );

        const existingRole = await client.jobTitle.findFirst({
            where: { name: { equals: name.trim(), mode: 'insensitive' } },
        });

        if (existingRole)
            return NextResponse.json(
                { message: 'Role already exist' },
                { status: 400 }
            );

        const newJobTitle = await client.jobTitle.create({ data: { name } });
        return NextResponse.json({
            message: 'New job title is added',
            role: newJobTitle,
        });
    } catch (error) {
        return NextResponse.json(
            { message: getErrorMessage(error) },
            { status: 500 }
        );
    }
}

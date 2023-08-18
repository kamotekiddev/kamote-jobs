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

        const jobRoles = await client.jobRole.findMany({
            where: {
                role: { contains: searchQuery || '', mode: 'insensitive' },
            },
        });
        return NextResponse.json(jobRoles);
    } catch (error) {
        return NextResponse.json(
            { message: getErrorMessage(error) },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const { role } = await req.json();
        const currentUser = await getCurrentUser();

        if (!currentUser?.id)
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );

        if (!role)
            return NextResponse.json(
                { message: 'Invalid Data' },
                { status: 400 }
            );

        const existingRole = await client.jobRole.findFirst({
            where: { role: { equals: role.trim(), mode: 'insensitive' } },
        });

        if (existingRole)
            return NextResponse.json(
                { message: 'Role already exist' },
                { status: 400 }
            );

        const newRole = await client.jobRole.create({ data: { role } });
        return NextResponse.json({
            message: 'New role is added',
            role: newRole,
        });
    } catch (error) {
        return NextResponse.json(
            { message: getErrorMessage(error) },
            { status: 500 }
        );
    }
}

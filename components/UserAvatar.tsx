'use client';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import getUserInitials from '@/lib/getUserInitials';
import Link from 'next/link';

type UserAvatarProps = {
    user: User;
};

const UserAvatar = ({ user }: UserAvatarProps) => {
    const userInitials = getUserInitials(user?.name!);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image!} />
                    <AvatarFallback>{userInitials}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                {user?.role === 'jobseeker' && (
                    <>
                        <DropdownMenuSeparator />
                        <Link href='/jobs/saved'>
                            <DropdownMenuItem>Saved Jobs</DropdownMenuItem>
                        </Link>
                        <Link href='/jobs/my-job-applications'>
                            <DropdownMenuItem>
                                Job Applications
                            </DropdownMenuItem>
                        </Link>
                    </>
                )}
                {user?.role === 'recruiter' && (
                    <>
                        <DropdownMenuSeparator />
                        <Link href='/jobs/owned'>
                            <DropdownMenuItem>My Jobs</DropdownMenuItem>
                        </Link>
                    </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                    Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserAvatar;

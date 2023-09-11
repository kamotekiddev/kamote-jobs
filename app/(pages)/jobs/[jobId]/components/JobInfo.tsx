import { formatDistanceToNow } from 'date-fns';
import { MoreHorizontal } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import { FullJobPost } from '@/types/jobPost';
import ApplyToJobModal from './ApplyToJobModal';
import getUserInitials from '@/lib/getUserInitials';
import CancelJobApplicationModal from './CancelJobApplicationModal';
import { useSaveUnsavePost, useUpdateHiringStatus } from '@/hooks/useJobPosts';

type Props = {
    jobPost?: FullJobPost;
};

const HiringBadgeStyleMap: Record<number, string> = {
    1: 'border-green-500 text-green-500',
    0: 'border-red-500 text-red-500',
};

const JobInfo = ({ jobPost }: Props) => {
    const { data: session } = useSession();
    const [applyConfirmationOpen, setApplyConfirmationOpen] = useState(false);
    const [cancelConfirmationOpen, setCancelConfirmationOpen] = useState(false);
    const saveUnsaveJobPost = useSaveUnsavePost();
    const stopHiring = useUpdateHiringStatus();

    const isMyPost = jobPost?.userId === session?.user.id;

    const isSaved = jobPost?.savedByUserIds.includes(session?.user.id);
    const myApplication = jobPost?.jobApplications.find(
        (application) => application.userId === session?.user.id
    );
    const applicationCounts = jobPost?.jobApplications.length;
    const alreadyApplied = !!myApplication;

    const userInitial = getUserInitials(jobPost?.user?.name!);
    const formattedDate = jobPost?.createdAt
        ? formatDistanceToNow(new Date(jobPost?.createdAt), {
              addSuffix: true,
          })
        : '';

    const handleSaveUnsaveJobPost = async () =>
        saveUnsaveJobPost.mutate({
            action: isSaved ? 'unsave' : 'save',
            postId: jobPost?.id!,
        });

    const handleStopHiring = () => stopHiring.mutate(jobPost?.id!);

    return (
        <>
            <article className='space-y-4 rounded-lg bg-white p-4 shadow-sm'>
                <div className='flex items-start justify-between gap-2'>
                    <div>
                        <div className='flex items-center gap-2'>
                            <h1 className='text-2xl font-black'>
                                {jobPost?.jobTitle}
                            </h1>
                            <Badge className='uppercase'>
                                {jobPost?.employmentType}
                            </Badge>
                        </div>
                        <div className='flex items-center gap-2'>
                            <p>{jobPost?.companyName}</p>
                            <Badge
                                variant='outline'
                                className={cn(
                                    'pointer-events-none uppercase',
                                    HiringBadgeStyleMap[
                                        Number(jobPost?.isHiring)
                                    ]
                                )}
                            >
                                {jobPost?.isHiring ? 'Hiring' : 'Not Hiring'}
                            </Badge>
                        </div>
                    </div>
                    {isMyPost && (
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <MoreHorizontal />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleStopHiring}>
                                    Stop Hiring
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
                <div>
                    <div className='flex gap-2'>
                        <p>{jobPost?.location}</p>-
                        <p>({jobPost?.workplaceType})</p>-
                        <p className='font-bold'>{formattedDate}</p>
                    </div>
                </div>
                {!isMyPost && (
                    <>
                        {jobPost?.isHiring && (
                            <div className='flex gap-2 py-4'>
                                <Button
                                    disabled={alreadyApplied}
                                    className='rounded-full'
                                    variant={
                                        alreadyApplied ? 'default' : 'outline'
                                    }
                                    onClick={() =>
                                        setApplyConfirmationOpen(true)
                                    }
                                >
                                    {alreadyApplied ? 'Applied' : 'Apply Now'}
                                </Button>
                                {alreadyApplied && (
                                    <Button
                                        className='rounded-full'
                                        variant='outline'
                                        onClick={() =>
                                            setCancelConfirmationOpen(true)
                                        }
                                    >
                                        Cancel Application
                                    </Button>
                                )}
                                <Button
                                    onClick={handleSaveUnsaveJobPost}
                                    className='rounded-full'
                                    variant={isSaved ? 'default' : 'outline'}
                                    disabled={saveUnsaveJobPost.isLoading}
                                >
                                    {isSaved ? 'Saved' : 'Save'}
                                </Button>
                            </div>
                        )}
                        <div className='flex gap-2'>
                            <div className='flex-[2] rounded-lg border p-4 shadow-sm'>
                                <h1 className='mb-4 text-xl font-bold'>
                                    Meet Hiring Personnel
                                </h1>
                                <div className='flex items-center gap-4'>
                                    <Avatar className='h-10 w-10 rounded-full'>
                                        <AvatarImage
                                            src={jobPost?.user?.image!}
                                        />
                                        <AvatarFallback>
                                            {userInitial}
                                        </AvatarFallback>
                                    </Avatar>
                                    <h1>{jobPost?.user.name}</h1>
                                </div>
                            </div>
                            <div className='flex-1 rounded-lg border p-4 shadow-sm'>
                                <h1 className='mb-4'>Applicants</h1>
                                <p className='text-xl font-bold'>
                                    {applicationCounts}
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </article>
            <ApplyToJobModal
                isOpen={applyConfirmationOpen}
                jobpostId={jobPost?.id!}
                onClose={() => setApplyConfirmationOpen(false)}
            />
            <CancelJobApplicationModal
                isOpen={cancelConfirmationOpen}
                jobpostId={jobPost?.id!}
                applicationId={myApplication?.id!}
                onClose={() => setCancelConfirmationOpen(false)}
            />
        </>
    );
};

export default JobInfo;

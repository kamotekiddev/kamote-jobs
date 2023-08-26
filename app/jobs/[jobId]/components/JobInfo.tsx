'use client';

import { formatDistanceToNow } from 'date-fns';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { FullJobPost } from '@/types/jobPost';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import ApplyToJobModal from './ApplyToJobModal';
import getUserInitials from '@/lib/getUserInitials';

type Props = {
    jobPost: FullJobPost;
};
const JobInfo = ({ jobPost }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const userInitial = getUserInitials(jobPost?.user?.name!);
    const formattedDate = jobPost?.createdAt
        ? formatDistanceToNow(new Date(jobPost?.createdAt), {
              addSuffix: true,
          })
        : '';

    return (
        <>
            <article className='space-y-4 rounded-lg bg-white p-4 shadow-sm'>
                <div className='flex items-start justify-between gap-2'>
                    <div>
                        <h1 className='text-2xl font-black'>
                            {jobPost.jobTitle.name}
                        </h1>
                        <p>{jobPost.companyName}</p>
                    </div>
                    <Badge>{jobPost.employmentType.name}</Badge>
                </div>
                <div>
                    <div className='flex gap-2'>
                        <p>{jobPost.location}</p>-
                        <p>({jobPost.workplaceType.name})</p>-
                        <p className='font-bold'>{formattedDate}</p>
                    </div>
                </div>
                <div className='flex gap-2 py-4'>
                    <Button
                        className='rounded-full'
                        onClick={() => setIsOpen(true)}
                    >
                        Apply Now
                    </Button>
                    <Button className='rounded-full' variant='outline'>
                        Save
                    </Button>
                </div>
                <div className='flex gap-2'>
                    <div className='flex-[2] rounded-lg border p-4 shadow-sm'>
                        <h1 className='mb-4 text-xl font-bold'>
                            Meet Hiring Personnel
                        </h1>
                        <div className='flex items-center gap-4'>
                            <Avatar className='h-10 w-10 rounded-full'>
                                <AvatarImage src={jobPost?.user?.image!} />
                                <AvatarFallback>{userInitial}</AvatarFallback>
                            </Avatar>
                            <h1>{jobPost.user.name}</h1>
                        </div>
                    </div>
                    <div className='flex-1 rounded-lg border p-4 shadow-sm'>
                        <h1 className='mb-4'>Applicants</h1>
                        <p className='text-xl font-bold'>
                            {jobPost.applications.length}
                        </p>
                    </div>
                </div>
            </article>
            <ApplyToJobModal
                isOpen={isOpen}
                jobpostId={jobPost.id}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
};

export default JobInfo;

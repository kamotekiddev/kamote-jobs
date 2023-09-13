'use client';

import { formatDistanceToNow } from 'date-fns';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import getUserInitials from '@/lib/getUserInitials';
import { Button } from './ui/button';
import { JobPostListItem } from '@/types/jobPost';
import { Badge } from './ui/badge';

type Props = {
    jobPost?: JobPostListItem;
    withSeparator?: boolean;
    isSaved?: boolean;
    onSaveUnsave: (action: 'save' | 'unsave', jobPost: JobPostListItem) => void;
    withSaveButton?: boolean;
};
const RecruitmentListItem = ({
    jobPost,
    withSeparator,
    isSaved,
    onSaveUnsave,
    withSaveButton = true,
}: Props) => {
    const formattedDate = jobPost?.createdAt
        ? formatDistanceToNow(new Date(jobPost?.createdAt), {
              addSuffix: true,
          })
        : '';

    const userInitial = getUserInitials(jobPost?.user?.name!);

    return (
        <article
            className={cn('group flex cursor-default gap-10 p-2 lg:p-6', {
                'border-b': withSeparator,
            })}
        >
            <Avatar className='h-20 w-20 rounded-sm'>
                <AvatarImage src={jobPost?.user?.image!} />
                <AvatarFallback>{userInitial}</AvatarFallback>
            </Avatar>
            <div className='flex-1'>
                <div className='flex flex-wrap items-start gap-2'>
                    <div className='flex-1'>
                        <div>
                            <Link href={`/jobs/${jobPost?.id}`}>
                                <h1 className='text-lg font-bold text-slate-500 group-hover:underline'>
                                    {jobPost?.jobTitle}
                                </h1>
                            </Link>
                        </div>
                        <p className='text-sm'>{jobPost?.companyName}</p>
                    </div>
                    <div className='flex gap-2'>
                        <Badge
                            variant='outline'
                            className={cn(
                                'pointer-events-none select-none uppercase',
                                {
                                    'border-green-500 text-green-500':
                                        jobPost?.isHiring,
                                },
                                {
                                    'border-red-500 text-red-500':
                                        !jobPost?.isHiring,
                                }
                            )}
                        >
                            {jobPost?.isHiring ? 'Hiring' : 'Not Hiring'}
                        </Badge>
                        {withSaveButton && (
                            <Button
                                size='sm'
                                className='rounded-full'
                                variant={isSaved ? 'default' : 'outline'}
                                onClick={() =>
                                    onSaveUnsave(
                                        isSaved ? 'unsave' : 'save',
                                        jobPost!
                                    )
                                }
                            >
                                {isSaved ? 'Saved' : 'Save'}
                            </Button>
                        )}
                    </div>
                </div>
                <div className='mt-2 flex flex-wrap gap-2 text-sm'>
                    <p>{jobPost?.location}</p>
                    <p>({jobPost?.workplaceType})</p>
                </div>
                <div className='flex items-center gap-2 text-sm'>
                    <p>{jobPost?.employmentType}</p> -
                    <p className='font-bold'>{formattedDate}</p>
                </div>
            </div>
        </article>
    );
};

export default RecruitmentListItem;

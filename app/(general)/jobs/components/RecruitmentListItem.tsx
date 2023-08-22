'use client';

import { BookmarkIcon, BookmarkPlus } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { experimental_useOptimistic as useOptimistic } from 'react';

import { useSession } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { FullJobPosts } from '@/types/jobPost';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import getUserInitials from '@/lib/getUserInitials';
import saveJob from '@/actions/saveJob';
import unSaveJob from '@/actions/unSaveJob';

type Props = {
    jobPost?: FullJobPosts;
    withSeparator?: boolean;
};
const RecruitmentListItem = ({ jobPost, withSeparator }: Props) => {
    const { data: session } = useSession();
    const userid = session?.user.id;

    const [optimisticUserids, addOptimisticUserId] = useOptimistic(
        jobPost?.savedByUserIds,
        (state, newUserId: string) =>
            jobPost?.savedByUserIds.includes(userid)
                ? [...(state || [])?.filter((id) => id !== session?.user.id)]
                : [...(state || []), newUserId]
    );

    const isSaved = optimisticUserids?.includes(session?.user.id);

    const formattedDate = jobPost?.createdAt
        ? formatDistanceToNow(new Date(jobPost?.createdAt), {
              addSuffix: true,
          })
        : '';

    const userInitial = getUserInitials(jobPost?.user.name!);

    const handleSaveUnsaveJob = async () => {
        addOptimisticUserId(userid);
        if (jobPost?.savedByUserIds.includes(userid))
            return await unSaveJob(jobPost?.id);
        return await saveJob(jobPost?.id);
    };

    return (
        <article
            className={cn('group flex cursor-pointer gap-6 py-6', {
                'border-b': withSeparator,
            })}
        >
            <Avatar className='h-20 w-20 rounded-sm'>
                <AvatarImage src={jobPost?.user?.image!} />
                <AvatarFallback>{userInitial}</AvatarFallback>
            </Avatar>
            <div className='flex-1'>
                <div className='flex items-center gap-2'>
                    <div className='flex-1'>
                        <h1 className='text-lg font-bold text-slate-500 group-hover:underline'>
                            {jobPost?.jobTitle.name}
                        </h1>

                        <p className='text-sm'>{jobPost?.companyName}</p>
                    </div>
                    <Button
                        variant='link'
                        onClick={handleSaveUnsaveJob}
                        size='icon'
                    >
                        {isSaved ? <BookmarkPlus /> : <BookmarkIcon />}
                    </Button>
                </div>
                <div className='mt-2 flex gap-2 text-sm'>
                    <p>{jobPost?.location}</p>
                    <p>({jobPost?.workplaceType.name})</p>
                </div>
                <div className='flex items-center gap-2 text-sm'>
                    <p>{jobPost?.employmentType.name}</p> -
                    <p className='font-bold'>{formattedDate}</p>
                </div>
            </div>
        </article>
    );
};

export default RecruitmentListItem;

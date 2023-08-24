'use client';

import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { formatDistanceToNow } from 'date-fns';

import { cn } from '@/lib/utils';
import { FullJobPost } from '@/types/jobPost';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import getUserInitials from '@/lib/getUserInitials';

type Props = {
    jobPost?: FullJobPost;
    withSeparator?: boolean;
    isSaved?: boolean;
    onSaveUnsave: (action: 'save' | 'unsave', jobPost: FullJobPost) => void;
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
            className={cn('group flex cursor-pointer gap-6 py-6', {
                'border-b': withSeparator,
            })}
        >
            <Avatar className='h-20 w-20 rounded-sm'>
                <AvatarImage src={jobPost?.user?.image!} />
                <AvatarFallback>{userInitial}</AvatarFallback>
            </Avatar>
            <div className='flex-1'>
                <div className='flex items-start gap-2'>
                    <div className='flex-1'>
                        <h1 className='text-lg font-bold text-slate-500 group-hover:underline'>
                            {jobPost?.jobTitle.name}
                        </h1>

                        <p className='text-sm'>{jobPost?.companyName}</p>
                    </div>
                    {withSaveButton && (
                        <button
                            className='px-2 text-2xl'
                            onClick={() =>
                                onSaveUnsave(
                                    isSaved ? 'unsave' : 'save',
                                    jobPost!
                                )
                            }
                        >
                            {isSaved ? <BsHeartFill /> : <BsHeart />}
                        </button>
                    )}
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

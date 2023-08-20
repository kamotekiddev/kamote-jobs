import { Bookmark } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

import { cn } from '@/lib/utils';
import { FullJobPosts } from '@/types/jobPost';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Props = {
    jobPost: FullJobPosts;
    withSeparator?: boolean;
};
const RecruitmentListItem = ({ jobPost, withSeparator }: Props) => {
    const formattedDate = formatDistanceToNow(new Date(jobPost.createdAt), {
        addSuffix: true,
    });

    return (
        <article
            className={cn('flex gap-6 py-6', { 'border-b': withSeparator })}
        >
            <Avatar className='h-20 w-20 rounded-sm'>
                <AvatarImage src={jobPost.user.image!} />
                <AvatarFallback>{jobPost.user.name}</AvatarFallback>
            </Avatar>
            <div className='flex-1'>
                <div className='flex items-center gap-2'>
                    <div className='flex-1'>
                        <h1 className='text-lg font-bold text-slate-500 hover:underline'>
                            {jobPost.jobTitle.name}
                        </h1>

                        <p className='text-sm'>{jobPost.companyName}</p>
                    </div>
                    <div>
                        <Bookmark />
                    </div>
                </div>
                <div className='mt-2 flex gap-2 text-sm'>
                    <p>{jobPost.location}</p>
                    <p>({jobPost.workplaceType.name})</p>
                </div>
                <div className='flex items-center gap-2 text-sm'>
                    <p>{jobPost.employmentType.name}</p> -
                    <p className='font-bold'>{formattedDate}</p>
                </div>
            </div>
        </article>
    );
};

export default RecruitmentListItem;

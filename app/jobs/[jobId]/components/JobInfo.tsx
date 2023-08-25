import { formatDistanceToNow } from 'date-fns';

import { Badge } from '@/components/ui/badge';
import { FullJobPost } from '@/types/jobPost';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import getUserInitials from '@/lib/getUserInitials';
import { Button } from '@/components/ui/button';

type Props = {
    jobPost: FullJobPost;
};
const JobInfo = ({ jobPost }: Props) => {
    const userInitial = getUserInitials(jobPost?.user?.name!);
    const formattedDate = jobPost?.createdAt
        ? formatDistanceToNow(new Date(jobPost?.createdAt), {
              addSuffix: true,
          })
        : '';
    return (
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
                <Button className='rounded-full'>Apply Now</Button>
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
                    <p className='text-xl font-bold'>{0}</p>
                </div>
            </div>
        </article>
    );
};

export default JobInfo;

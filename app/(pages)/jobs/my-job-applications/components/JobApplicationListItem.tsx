import { cn } from '@/lib/utils';
import { Link, Mail, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FullJobApplication } from '@/types/job-application';
import { StatusBadgeStyle } from '@/app/jobs/[jobId]/components/JobApplicationList/JobApplication';

type Props = { jobApplication: FullJobApplication };

const JobApplicationListItem = ({ jobApplication }: Props) => {
    const jobPost = jobApplication.jobPost;
    const status = jobApplication.status;

    return (
        <article className='rounded-lg border bg-white p-4 shadow-sm'>
            <div>
                <div className='flex items-center justify-between gap-4'>
                    <h1 className='text-xl font-black'>{jobPost.jobTitle}</h1>
                    <Badge
                        className={cn(
                            `uppercase`,
                            StatusBadgeStyle[jobApplication.status]
                        )}
                    >
                        {jobApplication.status}
                    </Badge>
                </div>
                <p className='text-sm text-gray-600'>{jobPost.companyName}</p>
            </div>
            <div className='mt-4 space-y-4'>
                {status === 'rejected' && (
                    <p className='text-sm text-red-500'>
                        Unfortunately {jobPost.companyName} has decided to move
                        on the next step of application process and you are not
                        selected.
                    </p>
                )}
                <p className='text-sm text-gray-500'>
                    {jobApplication.caption}
                </p>

                <div className='space-y-2'>
                    <p className='flex items-center gap-4 text-sm'>
                        <Mail className='h-4 w-4' /> {jobApplication?.email}
                    </p>
                    <p className='flex items-center gap-4 text-sm'>
                        <Phone className='h-4 w-4' />
                        {jobApplication?.contactNo}
                    </p>
                </div>
                <a
                    href={jobApplication.resumeLink!}
                    className='inline-block'
                    target='_blank'
                >
                    <Button variant='outline' className='flex gap-4'>
                        <Link className='h-4 w-4' /> View Resume
                    </Button>
                </a>
            </div>
        </article>
    );
};

export default JobApplicationListItem;

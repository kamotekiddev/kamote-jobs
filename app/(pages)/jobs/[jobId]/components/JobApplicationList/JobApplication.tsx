import { Link, Mail, Phone } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { FullJobApplication } from '@/types/job-application';
import { useUpdateJobApplication } from '@/hooks/useJobApplication';
import getUserInitials from '@/lib/getUserInitials';

type Props = {
    jobApplication?: FullJobApplication;
};

const ActionButtonMap: Record<string, string> = {
    applied: 'For Interview',
    interview: 'Hire',
};

export const StatusBadgeStyle: Record<string, string> = {
    rejected: 'bg-red-500',
    interview: 'bg-blue-500',
    hired: 'bg-green-500',
};

const JobApplicationListItem = ({ jobApplication }: Props) => {
    const user = jobApplication?.user;
    const userInitials = getUserInitials(user?.name!);
    const updateStatus = useUpdateJobApplication();

    const handleRejectApplicant = () =>
        updateStatus.mutate({
            applicationId: jobApplication?.id!,
            jobId: jobApplication?.jobPostId!,
            data: { status: 'rejected' },
        });

    const handleUpdateStatus = () => {
        if (jobApplication?.status === 'rejected') return null;
        if (jobApplication?.status === 'applied')
            return updateStatus.mutate({
                applicationId: jobApplication?.id!,
                jobId: jobApplication?.jobPostId!,
                data: { status: 'interview' },
            });
        return updateStatus.mutate({
            applicationId: jobApplication?.id!,
            jobId: jobApplication?.jobPostId!,
            data: { status: 'hired' },
        });
    };

    return (
        <article className='flex gap-6 rounded-lg border p-4 shadow-sm'>
            <Avatar>
                <AvatarImage src={user?.image!} />
                <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
            <div className='flex-1'>
                <div className='mb-4 flex justify-between gap-4'>
                    <h1 className='font-bold'>{user?.name}</h1>
                    <Badge
                        className={cn(
                            'pointer-events-none font-bold uppercase',
                            StatusBadgeStyle[jobApplication?.status!]
                        )}
                    >
                        {jobApplication?.status}
                    </Badge>
                </div>
                <p className='mb-4 line-clamp-2 text-sm text-slate-500'>
                    {jobApplication?.caption}
                </p>
                <div className='space-y-4'>
                    <div className='space-y-2'>
                        <p className='flex items-center gap-4 text-sm'>
                            <Mail className='h-4 w-4' /> {jobApplication?.email}
                        </p>
                        <p className='flex items-center gap-4 text-sm'>
                            <Phone className='h-4 w-4' />
                            {jobApplication?.contactNo}
                        </p>
                    </div>
                    <div className='flex justify-between gap-4'>
                        <a href={jobApplication?.resumeLink!} target='_blank'>
                            <Button variant='outline' className='flex gap-2'>
                                <Link className='h-4 w-4' />
                                View Resume
                            </Button>
                        </a>
                        {jobApplication?.status !== 'rejected' &&
                            jobApplication?.status !== 'hired' && (
                                <div className='flex-shrink-0 space-x-2'>
                                    <Button
                                        variant='outline'
                                        disabled={updateStatus.isLoading}
                                        onClick={handleUpdateStatus}
                                    >
                                        {
                                            ActionButtonMap[
                                                jobApplication?.status!
                                            ]
                                        }
                                    </Button>
                                    <Button
                                        variant='destructive'
                                        disabled={updateStatus.isLoading}
                                        onClick={handleRejectApplicant}
                                    >
                                        Reject
                                    </Button>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </article>
    );
};

export default JobApplicationListItem;

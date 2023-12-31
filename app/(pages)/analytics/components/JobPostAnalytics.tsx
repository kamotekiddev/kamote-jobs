import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Files } from 'lucide-react';

type JobAnalyticsProps = {
    totalJobsCount?: number;
    hiringJobsCount?: number;
    notHiringJobsCount?: number;
};

const JobPostAnalytics = ({
    totalJobsCount,
    hiringJobsCount,
    notHiringJobsCount,
}: JobAnalyticsProps) => {
    return (
        <Card className='w-full'>
            <div className='flex'>
                <div className='flex-1'>
                    <CardHeader>
                        <div className='flex items-center justify-between'>
                            <CardTitle className='text-xl'>Jobs</CardTitle>
                            <Files />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <CardTitle className='text-7xl font-black'>
                            {totalJobsCount}
                        </CardTitle>
                    </CardContent>
                </div>
                <div className='flex flex-1 flex-col border-l'>
                    <div className='flex-1  border-b p-4'>
                        <h1 className='text-sm font-bold'>Hiring</h1>
                        <h2 className='mt-2 text-3xl font-black'>
                            {hiringJobsCount}
                        </h2>
                    </div>
                    <div className='flex-1 p-4'>
                        <h1 className='text-sm font-bold'>Not Hiring</h1>
                        <h2 className='mt-2 text-3xl font-black'>
                            {notHiringJobsCount}
                        </h2>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default JobPostAnalytics;

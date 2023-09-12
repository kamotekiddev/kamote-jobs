import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon, Users } from 'lucide-react';

type JobApplicationsAnalyticsProps = {
    title: string;
    figures: string;
};

const JobApplicationsAnalytics = ({
    title,
    figures,
}: JobApplicationsAnalyticsProps) => {
    return (
        <Card className='w-full'>
            <CardHeader>
                <div className='flex justify-between gap-2'>
                    <CardTitle className='text-lg'>{title}</CardTitle>
                    <Users />
                </div>
            </CardHeader>
            <CardContent>
                <CardTitle className='text-7xl font-black'>{figures}</CardTitle>
            </CardContent>
        </Card>
    );
};

export default JobApplicationsAnalytics;

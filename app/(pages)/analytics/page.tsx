import JobApplicationsAnalytics from './components/JobApplicationsAnalytics';
import { Users } from 'lucide-react';
import JobPostAnalytics from './components/JobPostAnalytics';

const Analytics = () => {
    return (
        <section>
            <div className='grid gap-4'>
                <JobPostAnalytics />
                <JobApplicationsAnalytics title='Applications' figures='5' />
            </div>
        </section>
    );
};

export default Analytics;

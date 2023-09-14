import EmptyState from '@/components/EmptyState';
import JobApplicationsAnalytics from './components/JobApplicationsAnalytics';
import JobPostAnalytics from './components/JobPostAnalytics';
import getAnalytics from '@/actions/getAnalytics';

const Analytics = async () => {
    const analytics = await getAnalytics();

    if (!analytics)
        return (
            <EmptyState title='Something went wrong. Please try again later.' />
        );

    return (
        <section>
            <div className='grid gap-4'>
                <JobPostAnalytics
                    totalJobsCount={analytics.jobsCount}
                    hiringJobsCount={analytics.jobsHiringCount}
                    notHiringJobsCount={analytics.jobsNotHiringCount}
                />
                <JobApplicationsAnalytics
                    title='Applications'
                    figures={analytics.jobsApplicationsCount}
                />
            </div>
        </section>
    );
};

export default Analytics;

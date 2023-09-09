import { redirect } from 'next/navigation';
import getJobList from '@/actions/getJobsList';
import JobList from './components/JobList';
import EmptyState from '@/components/EmptyState';
import getCurrentUser from '@/actions/getCurrentUser';

const Jobs = async () => {
    const user = await getCurrentUser();
    const { jobPosts, error } = await getJobList();

    if (user && user.role === 'recruiter') redirect('/jobs/owned');
    if (error) return <EmptyState title={error} />;

    return (
        <section>
            <JobList initialJobListItems={jobPosts} />
        </section>
    );
};

export default Jobs;

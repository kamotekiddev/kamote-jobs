import { redirect } from 'next/navigation';
import getJobList from '@/actions/getJobsList';
import JobList from './components/JobList';
import EmptyState from '@/components/EmptyState';
import getCurrentUser from '@/actions/getCurrentUser';
import SearchBox from '@/components/SearchBox';

const Jobs = async () => {
    const user = await getCurrentUser();
    const { jobPosts, error } = await getJobList();

    if (user && user.role === 'recruiter') redirect('/analytics');
    if (error) return <EmptyState title={error} />;

    return (
        <section className='space-y-4 p-2'>
            {user?.role === 'jobseeker' && <SearchBox />}
            <JobList initialJobListItems={jobPosts} />
        </section>
    );
};

export default Jobs;

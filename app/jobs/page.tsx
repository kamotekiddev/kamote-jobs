import getJobList from '@/actions/getJobsList';
import JobList from './components/JobList';
import EmptyState from '@/components/EmptyState';

const Jobs = async () => {
    const { jobPosts, error } = await getJobList();

    if (error) return <EmptyState title={error} />;

    return (
        <section className='grid grid-cols-[1fr_300px]'>
            <JobList initialJobListItems={jobPosts} />
        </section>
    );
};

export default Jobs;

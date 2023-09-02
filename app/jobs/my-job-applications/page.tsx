import getMyJobApplications from '@/actions/getMyJobApplications';
import JobApplicationList from './components/JobApplications';
import EmptyState from '@/components/EmptyState';

const MyJobApplications = async () => {
    const { jobApplications, error } = await getMyJobApplications();

    if (error) return <EmptyState title={error} />;

    return (
        <section className='grid grid-cols-[1fr_300px]'>
            <JobApplicationList initialJobApplications={jobApplications} />
        </section>
    );
};

export default MyJobApplications;

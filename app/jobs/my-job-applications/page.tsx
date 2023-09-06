import getMyJobApplications from '@/actions/getMyJobApplications';
import JobApplicationList from './components/JobApplications';
import EmptyState from '@/components/EmptyState';

const MyJobApplications = async () => {
    const { jobApplications, error } = await getMyJobApplications();

    if (error) return <EmptyState title={error} />;

    return <JobApplicationList initialJobApplications={jobApplications} />;
};

export default MyJobApplications;

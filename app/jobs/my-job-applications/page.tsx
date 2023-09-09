import { redirect } from 'next/navigation';
import getMyJobApplications from '@/actions/getMyJobApplications';
import JobApplicationList from './components/JobApplications';
import EmptyState from '@/components/EmptyState';
import getCurrentUser from '@/actions/getCurrentUser';

const MyJobApplications = async () => {
    const user = await getCurrentUser();
    const { jobApplications, error } = await getMyJobApplications();

    if (user && user.role === 'recruiter') redirect('/jobs/owned');

    if (error) return <EmptyState title={error} />;

    return <JobApplicationList initialJobApplications={jobApplications} />;
};

export default MyJobApplications;

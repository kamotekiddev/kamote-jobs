import { redirect } from 'next/navigation';
import getMyJobApplications from '@/actions/getMyJobApplications';
import JobApplicationList from './components/JobApplications';
import EmptyState from '@/components/EmptyState';
import getCurrentUser from '@/actions/getCurrentUser';
import JobApplicationFilter from './components/JobApplicationFilter';

const MyJobApplications = async () => {
    const user = await getCurrentUser();
    const { jobApplications, error } = await getMyJobApplications();

    if (user && user.role === 'recruiter') redirect('/analytics');

    if (error) return <EmptyState title={error} />;

    return (
        <section className='space-y-4 p-2'>
            <header>
                <JobApplicationFilter />
            </header>
            <JobApplicationList initialJobApplications={jobApplications} />
        </section>
    );
};

export default MyJobApplications;

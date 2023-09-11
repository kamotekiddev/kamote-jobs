import { redirect } from 'next/navigation';
import getMyJobApplications from '@/actions/getMyJobApplications';
import JobApplicationList from './components/JobApplications';
import EmptyState from '@/components/EmptyState';
import getCurrentUser from '@/actions/getCurrentUser';
import JobApplicationFilter from './components/JobApplicationFilter';

const MyJobApplications = async () => {
    const user = await getCurrentUser();
    const { jobApplications, error } = await getMyJobApplications();

    if (user && user.role === 'recruiter') redirect('/jobs/owned');

    if (error) return <EmptyState title={error} />;

    return (
        <section>
            <header className='sticky top-[72px] mb-4 flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm'>
                <h1 className='text-xl font-bold'>Job Applications</h1>
                <JobApplicationFilter />
            </header>
            <JobApplicationList initialJobApplications={jobApplications} />
        </section>
    );
};

export default MyJobApplications;

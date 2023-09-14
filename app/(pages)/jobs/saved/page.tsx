import { redirect } from 'next/navigation';
import getSavedJobList from '@/actions/getSavedJobList';
import SavedJobList from './components/SavedJobList';
import EmptyState from '@/components/EmptyState';
import getCurrentUser from '@/actions/getCurrentUser';
import HiringStatusFilter from '@/components/HiringStatusFilter';

const SavedJobs = async () => {
    const user = await getCurrentUser();
    const { jobList, error } = await getSavedJobList();

    if (error) return <EmptyState title={error} />;
    if (user && user.role === 'recruiter') redirect('/analytics');

    return (
        <section className='overflow-auto scrollbar-hide'>
            <div className='space-y-4'>
                <header className='sticky top-0 z-50 flex items-center justify-between gap-4 rounded-lg border bg-white p-4 shadow-sm'>
                    <h1 className='text-xl font-bold'>Saved Jobs</h1>
                    <HiringStatusFilter />
                </header>
                <SavedJobList initialJobList={jobList} />
            </div>
        </section>
    );
};

export default SavedJobs;

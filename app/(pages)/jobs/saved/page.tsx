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
        <section className='overflow-auto p-2 scrollbar-hide'>
            <div className='space-y-4'>
                <header>
                    <HiringStatusFilter />
                </header>
                <SavedJobList initialJobList={jobList} />
            </div>
        </section>
    );
};

export default SavedJobs;

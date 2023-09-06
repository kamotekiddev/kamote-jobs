import getSavedJobList from '@/actions/getSavedJobList';
import SavedJobList from './components/SavedJobList';
import EmptyState from '@/components/EmptyState';

const SavedJobs = async () => {
    const { jobList, error } = await getSavedJobList();

    if (error) return <EmptyState title={error} />;

    return (
        <section className='overflow-auto scrollbar-hide'>
            <div className='space-y-4'>
                <header className='sticky top-0 z-50 rounded-lg border bg-white p-4 shadow-sm'>
                    <h1 className='text-xl font-bold'>Saved Jobs</h1>
                </header>
                <SavedJobList initialJobList={jobList} />
            </div>
        </section>
    );
};

export default SavedJobs;

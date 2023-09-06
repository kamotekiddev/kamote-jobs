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
                    <h1 className='text-2xl font-black'>Saved Jobs</h1>
                    <p>
                        All of the Job recruitments that you previously saved.
                    </p>
                </header>
                <SavedJobList initialJobList={jobList} />
            </div>
        </section>
    );
};

export default SavedJobs;

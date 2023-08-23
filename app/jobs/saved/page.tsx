import SavedJobList from './components/SavedJobList';

const SavedJobs = () => {
    return (
        <section className='grid grid-cols-[1fr_300px] overflow-auto scrollbar-hide'>
            <div className='space-y-4'>
                <header className='sticky top-0 z-50 rounded-lg border bg-white p-4 shadow-sm'>
                    <h1 className='text-2xl font-black'>Saved Jobs</h1>
                    <p>
                        All of the Job recruitments that you previously saved.
                    </p>
                </header>
                <SavedJobList />
            </div>
        </section>
    );
};

export default SavedJobs;

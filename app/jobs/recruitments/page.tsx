import OwnedJobList from './components/OwnedJobList';

const Recruitments = () => {
    return (
        <section className='grid grid-cols-[1fr_300px] overflow-auto scrollbar-hide'>
            <div className='space-y-4'>
                <section className='sticky top-0 z-50 rounded-lg border bg-white p-4'>
                    <h1 className='text-2xl font-black'>Your Recruitments</h1>
                    <p>List of your recruitments Notice</p>
                </section>
                <OwnedJobList />
            </div>
        </section>
    );
};

export default Recruitments;

import getMyJobList from '@/actions/getMyJoblist';
import OwnedJobList from './components/OwnedJobList';

const OwnedJobs = async () => {
    const { jobList } = await getMyJobList();

    return (
        <section className='overflow-auto scrollbar-hide'>
            <div className='space-y-4'>
                <section className='sticky top-0 z-50 rounded-lg border bg-white p-4'>
                    <h1 className='text-2xl font-black'>Owned JobPosts</h1>
                    <p>List of your recruitments Notice</p>
                </section>
                <OwnedJobList initialJobList={jobList} />
            </div>
        </section>
    );
};

export default OwnedJobs;

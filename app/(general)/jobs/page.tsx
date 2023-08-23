import { Suspense } from 'react';
import Loading from '@/components/Loading';
import JobList from './components/JobList';

const Jobs = () => {
    return (
        <section className='grid grid-cols-[1fr_300px] overflow-auto scrollbar-hide'>
            <div className='space-y-4'>
                <header className='sticky top-0 z-50 rounded-lg border bg-white p-4 shadow-sm'>
                    <h1 className='text-2xl font-black'>Jobs</h1>
                    <p>list of Job Recruitments</p>
                </header>
                <Suspense fallback={<Loading />}>
                    <JobList />
                </Suspense>
            </div>
        </section>
    );
};

export default Jobs;

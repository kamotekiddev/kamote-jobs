import Link from 'next/link';
import getMyJobList from '@/actions/getMyJoblist';
import OwnedJobList from './components/OwnedJobList';
import { Button } from '@/components/ui/button';
import HiringStatusFilter from '@/components/HiringStatusFilter';

const OwnedJobs = async () => {
    const { jobList } = await getMyJobList();

    return (
        <section className='overflow-auto scrollbar-hide'>
            <div className='space-y-4'>
                <header className='sticky top-0 z-40 flex items-center justify-between rounded-lg border bg-white p-4'>
                    <h1 className='text-xl font-bold'>My Posts</h1>
                    <div className='flex items-center gap-2'>
                        <Link href='/jobs/create'>
                            <Button size='sm'>Create</Button>
                        </Link>
                        <HiringStatusFilter />
                    </div>
                </header>
                <OwnedJobList initialJobList={jobList} />
            </div>
        </section>
    );
};

export default OwnedJobs;

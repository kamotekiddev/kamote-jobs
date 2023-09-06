import getMyJobList from '@/actions/getMyJoblist';
import OwnedJobList from './components/OwnedJobList';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const OwnedJobs = async () => {
    const { jobList } = await getMyJobList();

    return (
        <section className='overflow-auto scrollbar-hide'>
            <div className='space-y-4'>
                <header className='sticky top-0 z-50 flex items-center justify-between rounded-lg border bg-white p-4'>
                    <h1 className='text-xl font-bold'>Owned JobPosts</h1>
                    <Link href='/jobs/create'>
                        <Button size='sm'>Create</Button>
                    </Link>
                </header>
                <OwnedJobList initialJobList={jobList} />
            </div>
        </section>
    );
};

export default OwnedJobs;

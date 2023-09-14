import Link from 'next/link';
import { Button } from '@/components/ui/button';

import getMyJobList from '@/actions/getMyJoblist';
import OwnedJobList from './components/OwnedJobList';
import HiringStatusFilter from '@/components/HiringStatusFilter';

const OwnedJobs = async () => {
    const { jobList } = await getMyJobList();

    return (
        <section className='overflow-auto p-2 scrollbar-hide'>
            <div className='space-y-4'>
                <header className='flex items-center gap-2'>
                    <HiringStatusFilter />
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

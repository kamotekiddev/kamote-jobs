import Link from 'next/link';

const Jobs = () => {
    return (
        <main className='p-4'>
            <Link href='/jobs/create-job'>Create Job</Link>
        </main>
    );
};

export default Jobs;

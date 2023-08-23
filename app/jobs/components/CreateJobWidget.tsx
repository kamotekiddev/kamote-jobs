import { Button } from '@/components/ui/button';
import Link from 'next/link';

const CreateJobWidget = () => {
    return (
        <section className='grid h-max w-72 gap-4 rounded-lg border bg-white p-4 shadow-sm'>
            <h1 className='text-xl font-bold leading-none'>
                Looking Professionals
            </h1>
            <p className='text-sm'>Start recruiting professionals here.</p>
            <Link href='/jobs/create'>
                <Button className='w-full'>Start Recruiting</Button>
            </Link>
        </section>
    );
};

export default CreateJobWidget;

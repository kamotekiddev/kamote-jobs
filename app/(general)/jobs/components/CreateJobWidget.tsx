import { Button } from '@/components/ui/button';
import Link from 'next/link';

const CreateJobWidget = () => {
    return (
        <section className='h-max w-72 rounded-lg border p-4 shadow-sm'>
            <p className='mb-4 text-sm'>
                Are you looking for employees? create a Job Recruitment here
            </p>
            <Link href='/jobs/recruitments'>
                <Button className='w-full'>Recruit Employee</Button>
            </Link>
        </section>
    );
};

export default CreateJobWidget;

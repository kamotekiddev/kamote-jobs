import { Button } from './ui/button';

const RoleSelection = () => {
    return (
        <section className='p-4'>
            <div className='rounded-lg border bg-white p-4 shadow-sm'>
                <div className='mb-6'>
                    <h1 className='text-2xl font-black'>Select your Role</h1>
                    <p>Please select your purpose on using this website</p>
                </div>
                <div className='space-y-2'>
                    <Button className='w-full' variant='outline'>
                        I am a recruiter looking for talents
                    </Button>
                    <Button className='w-full' variant='outline'>
                        I am Jobseeker looking for opportunities
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default RoleSelection;

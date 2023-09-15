import { redirect } from 'next/navigation';
import getCurrentUser from '@/actions/getCurrentUser';
import SelectRole from './components/SelectRole';

const RoleSelection = async () => {
    const user = await getCurrentUser();

    if (user && !!user.role) redirect('/jobs');

    return (
        <section className='grid h-screen place-items-center p-4'>
            <SelectRole />
        </section>
    );
};

export default RoleSelection;

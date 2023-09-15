import { redirect } from 'next/navigation';
import getCurrentUser from '@/actions/getCurrentUser';
import SignInForm from './components/SignInForm';

const SignIn = async () => {
    const user = await getCurrentUser();

    if (user) redirect('/jobs');

    return (
        <main className='grid min-h-screen place-items-center p-4'>
            <SignInForm />
        </main>
    );
};

export default SignIn;

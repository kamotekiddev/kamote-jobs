import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BiSolidErrorCircle } from 'react-icons/bi';

const errors: Record<string, string> = {
    Signin: 'Try signing with a different account.',
    OAuthSignin: 'Try signing with a different account.',
    OAuthCallback: 'Try signing with a different account.',
    OAuthCreateAccount: 'Try signing with a different account.',
    EmailCreateAccount: 'Try signing with a different account.',
    Callback: 'Try signing with a different account.',
    OAuthAccountNotLinked:
        'To confirm your identity, sign in with the same account you used originally.',
    EmailSignin: 'Check your email address.',
    CredentialsSignin:
        'Sign in failed. Check the details you provided are correct.',
    default: 'Unable to sign in.',
};

interface Props {
    error?: string | null;
}

const SignInError = ({ error }: Props) => {
    if (!error) return null;

    const errorMessage = error && (errors[error] ?? errors.default);
    return (
        <Alert variant='destructive'>
            <BiSolidErrorCircle className='h-4 w-4' />
            <AlertTitle>Sign In Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
    );
};

export default SignInError;

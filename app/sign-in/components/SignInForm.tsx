'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Link from 'next/link';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import getErrorMessage from '@/lib/getErrorMessage';

const SignInFormSchema = z.object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty(),
});

const defaultValues: z.infer<typeof SignInFormSchema> = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const { toast } = useToast();
    const router = useRouter();
    const [isLoading, setIsloading] = useState(false);

    const form = useForm<z.infer<typeof SignInFormSchema>>({
        defaultValues,
        resolver: zodResolver(SignInFormSchema),
    });

    const onSubmit = async (values: z.infer<typeof SignInFormSchema>) => {
        try {
            setIsloading(true);
            const response = await signIn('credentials', {
                ...values,
                redirect: false,
            });
            if (response?.error)
                return toast({
                    title: 'Error',
                    description: response.error,
                    variant: 'destructive',
                });
            form.reset(defaultValues);
            router.push('/jobs');
        } catch (error) {
            toast({
                title: 'Error',
                description: getErrorMessage(error),
                variant: 'destructive',
            });
        } finally {
            setIsloading(false);
        }
    };

    const signInWithGoogle = () => signIn('google', { callbackUrl: '/jobs' });

    return (
        <Form {...form}>
            <form
                className='w-full max-w-md space-y-4 rounded-md border p-6 shadow-lg'
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <h1 className='text-2xl font-black'>Login to your account</h1>
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription />
                            <FormMessage>
                                {fieldState.error?.message}
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type='password' {...field} />
                            </FormControl>
                            <FormDescription />
                            <FormMessage>
                                {fieldState.error?.message}
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <Button disabled={isLoading} className='w-full' type='submit'>
                    {isLoading ? 'Logging in...' : 'Login'}
                </Button>
                <hr />
                <Button
                    variant='outline'
                    className='w-full'
                    type='button'
                    onClick={signInWithGoogle}
                >
                    Continue with Google
                </Button>
                <hr />
                <div className='flex items-center justify-center gap-2'>
                    <p className='text-sm'>Don&apos;t have an account?</p>
                    <Link
                        href='/sign-up'
                        className='text-sm hover:text-slate-500 hover:underline'
                    >
                        Register here
                    </Link>
                </div>
            </form>
        </Form>
    );
};

export default SignInForm;
